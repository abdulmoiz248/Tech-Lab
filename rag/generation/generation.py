# generation.py
import os, asyncio
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents.stuff import create_stuff_documents_chain
from langchain.chains.mapreduce import MapReduceChain
from langchain.prompts import PromptTemplate, ChatPromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# loader + retrieval reuse your existing index
def load_store(path="rag/rag_index"):
    emb = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return FAISS.load_local(path, emb, allow_dangerous_deserialization=True)


# Prompt templates
STUFF_TMPL = "Context:\n{context}\n\nQuestion: {query}\nAnswer:"
STUFF_CHAIN = ChatPromptTemplate.from_messages([
    ("system", "Use only provided context to answer accurately."),
    ("human", STUFF_TMPL)
])
COT_TMPL = "Let’s think step by step.\nContext:\n{context}\n\nQuestion: {query}\nAnswer:" 

# Builders
def build_simple_qa(store, streaming=False):
    retriever = store.as_retriever(search_kwargs={"k":5})
    llm = ChatOpenAI(model="gpt-4o", temperature=0.2, streaming=streaming)
    stuff_chain = create_stuff_documents_chain(llm=llm, prompt=STUFF_CHAIN)
    return create_retrieval_chain(retriever=retriever, combine_documents_chain=stuff_chain), retriever

def build_map_reduce_qa(store):
    retriever = store.as_retriever(search_kwargs={"k":8})
    llm = ChatOpenAI(model="gpt-4o", temperature=0.2)
    map_template = PromptTemplate(template=STUFF_TMPL, input_variables=["context","query"])
    reduce_template = PromptTemplate(template=STUFF_TMPL, input_variables=["context","query"])
    map_reduce = MapReduceChain.from_params(
        llm_chain_kwargs=dict(llm=llm, prompt=map_template),
        combine_documents_chain_kwargs=dict(llm_chain_kwargs=dict(llm=llm, prompt=reduce_template))
    )
    return create_retrieval_chain(retriever=retriever, combine_documents_chain=map_reduce), retriever

def build_cot_qa(store):
    retriever = store.as_retriever(search_kwargs={"k":5})
    llm = ChatOpenAI(model="gpt-4o", temperature=0.0)
    cot_prompt = ChatPromptTemplate.from_messages([
        ("system", "Use context and think step by step."),
        ("human", COT_TMPL)
    ])
    stuff_chain = create_stuff_documents_chain(llm=llm, prompt=cot_prompt)
    return create_retrieval_chain(retriever=retriever, combine_documents_chain=stuff_chain), retriever

# Runner examples
async def run_async_demo():
    store = load_store()
    qa_chain, _ = build_map_reduce_qa(store)
    res = await qa_chain.arun({"query": "Explain retrieval-augmented generation"})
    print("Async map-reduce result:", res)

def main():
    os.environ["OPENAI_API_KEY"] = "..."
    store = load_store()

    # Simple QA
    qa_chain, retr = build_simple_qa(store)
    out = qa_chain({"query": "What is RAG efficiency?"})
    print("QA:", out["result"])
    print("Sources:", [d.metadata.get("source") for d in out["source_documents"]])

    # Streaming tokens
    stream_chain, _ = build_simple_qa(store, streaming=True)
    for token in stream_chain.run({"query": "Define multi-hop RAG"}).stream():
        print(token, end="", flush=True)

    # Map‑Reduce multi‑hop
    mr_chain, _ = build_map_reduce_qa(store)
    mr_out = mr_chain({"query": "Compare FAISS and Qdrant on latency vs accuracy"})
    print("MapReduce:", mr_out["result"])

    # CoT
    cot_chain, _ = build_cot_qa(store)
    print("CoT:", cot_chain({"query": "Why use RAG over fine‑tuning?"})["result"])

    # Async
    asyncio.run(run_async_demo())

if __name__ == "__main__":
    main()
