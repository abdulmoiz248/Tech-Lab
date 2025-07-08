from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS, Qdrant, Chroma
from qdrant_client import QdrantClient
import os

# Load documents
def loadDocs(path):
    return DirectoryLoader(path=path, glob="**/*.*", show_progress=True).load()

# Clean text (remove headers, footers, newlines)
def cleanText(documents):
    cleaned = []
    for doc in documents:
        text = doc.page_content.strip().replace("\n", " ")
        doc.page_content = text
        cleaned.append(doc)
    return cleaned

# Chunk documents
def chunkDocs(documents, size=1000, overlap=200):
    textSplitter = RecursiveCharacterTextSplitter(chunk_size=size, chunk_overlap=overlap)
    return textSplitter.split_documents(documents)

# Get embedding model
def getEmbeddingModel(modelName="sentence-transformers/all-MiniLM-L6-v2"):
    return HuggingFaceEmbeddings(model_name=modelName)

# Save to FAISS
def saveToFAISS(chunks, embeddingModel, indexPath="rag_index"):
    store = FAISS.from_documents(chunks, embeddingModel)
    store.save_local(indexPath)
    return store

# Save to Qdrant
def saveToQdrant(chunks, embeddingModel, collectionName="rag_qdrant", host="localhost", port=6333):
    client = QdrantClient(host=host, port=port)
    store = Qdrant.from_documents(chunks, embeddingModel, collection_name=collectionName, client=client)
    return store

# Save to Chroma
def saveToChroma(chunks, embeddingModel, persistDir="rag_chroma"):
    store = Chroma.from_documents(chunks, embeddingModel, persist_directory=persistDir)
    store.persist()
    return store

# Orchestrator
def main(docPath, backend="faiss"):
    docs = loadDocs(docPath)
    cleanedDocs = cleanText(docs)
    chunks = chunkDocs(cleanedDocs)
    embeddingModel = getEmbeddingModel()

    backend = backend.lower()
    if backend == "faiss":
        saveToFAISS(chunks, embeddingModel)
        print("Saved to FAISS ✅")
    elif backend == "qdrant":
        saveToQdrant(chunks, embeddingModel)
        print("Saved to Qdrant ✅")
    elif backend == "chroma":
        saveToChroma(chunks, embeddingModel)
        print("Saved to Chroma ✅")
    else:
        raise ValueError("Unsupported backend. Choose from 'faiss', 'qdrant', or 'chroma'.")


