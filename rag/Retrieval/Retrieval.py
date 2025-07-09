from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import OpenAI
from langchain_community.retrievers import BM25Retriever
from langchain.retrievers import EnsembleRetriever

from langchain.chains import RetrievalQA, LLMChain
from langchain.prompts import PromptTemplate

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load embeddings + vectorstore
def loadVectorStore():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.load_local("rag/rag_index", embeddings, allow_dangerous_deserialization=True)

    return vectorstore, embeddings

# Basic top-k similarity search
def basicRetrieval(vectorstore, query, k=3):
    retrieved_docs = vectorstore.similarity_search(query, k=k)
    for i, doc in enumerate(retrieved_docs):
        print(f"\n[Basic Result #{i+1}]\n{doc.page_content}\n")

# Max Marginal Relevance (MMR) search
def mmrRetrieval(vectorstore, query, k=5, fetch_k=10):
    retrieved_docs = vectorstore.max_marginal_relevance_search(query, k=k, fetch_k=fetch_k)
    for i, doc in enumerate(retrieved_docs):
        print(f"\n[MMR Result #{i+1}]\n{doc.page_content}\n")

# LangChain retriever wrapper
def getRetriever(vectorstore, k=4):
    return vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": k})

# RetrievalQA chain (Retriever + LLM)
def runRetrievalQA(retriever, query):
    llm = OpenAI(model_name="gpt-3.5-turbo")
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True
    )
    result = qa_chain.run(query)
    print("\n[LLM Answer]\n", result)

# Hybrid Retrieval (BM25 + Vector)
def hybridRetrieval(vectorstore, docs, query):
    bm25 = BM25Retriever.from_documents(docs)
    bm25.k = 3
    ensemble = EnsembleRetriever(retrievers=[vectorstore.as_retriever(), bm25], weights=[0.7, 0.3])
    results = ensemble.get_relevant_documents(query)
    for i, doc in enumerate(results):
        print(f"\n[Hybrid #{i+1}]\n{doc.page_content}")

# Score threshold filtering
def retrievalWithScoreThreshold(vectorstore, embeddings, query, k=5, threshold=0.8):
    query_vec = embeddings.embed_query(query)
    results = vectorstore.similarity_search_with_score(query, k=k)
    filtered = [doc for doc, score in results if score > threshold]
    for i, doc in enumerate(filtered):
        print(f"\n[Above Threshold #{i+1}]\n{doc.page_content}")

# Query rewriting
def expandQuery(original_query):
    prompt = PromptTemplate.from_template("Rewrite the following query to be more specific: {query}")
    chain = LLMChain(llm=OpenAI(model_name="gpt-3.5-turbo"), prompt=prompt)
    new_query = chain.run({"query": original_query})
    print("\n[Expanded Query]:", new_query)
    return new_query

# Custom similarity function (mocked cosine sim logic)
def customSimilaritySearch(vectorstore, embeddings, query, k=3):
    query_vec = np.array(embeddings.embed_query(query)).reshape(1, -1)
    docs = vectorstore.similarity_search(query, k=10)
    scored = []
    for doc in docs:
        doc_vec = np.array(embeddings.embed_query(doc.page_content)).reshape(1, -1)
        sim = cosine_similarity(query_vec, doc_vec)[0][0]
        scored.append((doc, sim))
    sorted_docs = sorted(scored, key=lambda x: x[1], reverse=True)[:k]
    for i, (doc, score) in enumerate(sorted_docs):
        print(f"\n[Custom Sim #{i+1} | Score: {score:.3f}]\n{doc.page_content}")

# 🔁 Example usage
if __name__ == "__main__":
    query = "What is the the best db to use for speed?"
    vectorstore, embeddings = loadVectorStore()

    print("\n--- BASIC RETRIEVAL ---")
    basicRetrieval(vectorstore, query)

    print("\n--- MMR RETRIEVAL ---")
    mmrRetrieval(vectorstore, query)

    print("\n--- LANGCHAIN RETRIEVER ---")
    retriever = getRetriever(vectorstore)
    docs = retriever.get_relevant_documents(query)
    for i, doc in enumerate(docs):
        print(f"\n[Retriever #{i+1}]\n{doc.page_content}")

    print("\n--- RETRIEVAL QA WITH LLM ---")
    runRetrievalQA(retriever, query)

    print("\n--- QUERY EXPANSION ---")
    expanded = expandQuery(query)

    print("\n--- RETRIEVAL WITH THRESHOLD ---")
    retrievalWithScoreThreshold(vectorstore, embeddings, query)

    print("\n--- CUSTOM SIMILARITY SEARCH ---")
    customSimilaritySearch(vectorstore, embeddings, query)

    print("\n--- HYBRID RETRIEVAL (BM25 + VECTOR) ---")
    hybridRetrieval(vectorstore, docs, query)
