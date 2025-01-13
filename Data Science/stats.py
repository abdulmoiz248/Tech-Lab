import numpy as np
import pandas as pd
import statistics

import matplotlib.pyplot as plt #visuals
import seaborn as sns #visual

arr=np.array([1,2,3,4,5]);
# sum=np.sum(arr) # sum
# mean=sum/len(arr) # mean

# arr=np.sort(arr) # sort
# #builtin functions
# data=[]
# for i in range(1,10):
#     data.append(np.random.randint(0,100))

# median=np.median(data)
# mean=np.mean(data)
# mode=statistics.mode(data)
# variance=np.var(data)
# standardDeviation=np.std(data)

# print("Data=",data)
# print("Mean=",mean)
# print("Mode=",mode)
# print("Median=",median)
# print("Variance=",variance)
# print("Standard Deviation=",standardDeviation)


# reading from a file
dataSet = pd.read_csv("Data Science/people.csv")
print("Average Height: ",dataSet["Height(cm)"].mean())
print("Average Weight: ",np.mean(dataSet["Weight(kg)"]))

print("Median Height: ",dataSet["Height(cm)"].median())
print("Median Weight: ",np.median(dataSet["Weight(kg)"]))

print("Mode Height: ",dataSet["Height(cm)"].mode()[0])
print("Mode Weight: ",statistics.mode(dataSet["Weight(kg)"]))


print("Counts: ",dataSet["Height(cm)"].value_counts())


print("Null Values", dataSet.isnull().sum())  # check for null values

print("Range= ",dataSet["Height(cm)"].max()-dataSet["Height(cm)"].min())

# sns.histplot(x="Height(cm)",data=dataSet,bins=[i for i in range(140,200,5)])
# plt.plot([dataSet["Height(cm)"].mean() for i in range(0,10)],[i for i in range(0,10)],c="red", label="Mean")
# plt.plot([dataSet["Height(cm)"].median() for i in range(0,10)],[i for i in range(0,10)],c="blue", label="Median")
# plt.plot([dataSet["Height(cm)"].mode() for i in range(0,10)],[i for i in range(0,10)],c="purple" , label="Mode")
# plt.show()


#mean absoulte deviation

print("Mean absoulte deviation ",np.sum(np.abs(arr-np.mean(dataSet["Height(cm)"])))/len(dataSet["Height(cm)"]) )
print("Mean absoulte deviation ",np.sum(np.abs(arr-np.mean(dataSet["Weight(kg)"])))/len(dataSet["Weight(kg)"]) )
print("STANDARD deviation ",np.std(dataSet["Height(cm)"]))
print("Variances deviation ",np.std(dataSet["Height(cm)"])**2)
print("Variances  ",np.var(dataSet["Height(cm)"])**2)

print(dataSet.describe())

print("percentile 50%",np.percentile(dataSet["Height(cm)"],50))