import numpy as np
import statistics

data=[]
for i in range(1,10):
    data.append(np.random.randint(0,100))

median=np.median(data)
mean=np.mean(data)
mode=statistics.mode(data)
variance=np.var(data)
standardDeviation=np.std(data)

print("Data=",data)
print("Mean=",mean)
print("Mode=",mode)
print("Median=",median)
print("Variance=",variance)
print("Standard Deviation=",standardDeviation)

