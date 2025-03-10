#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd 
from sklearn.model_selection import KFlod
from skleaen.model_selection import cross_val_score
from sklearn.tree import DecisionTreeclassifier
from sklearn.model_selection import KFold, StratifiedkFlod


# In[2]:


dataframe = pd.read_csv("diabetes.csv")
dataframe


# In[9]:


from numpy import array
from sklearn.model_selection import KFold, StratifiedKFold
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

#array = dataframe.values   
X = dataframe.iloc[:,0:8]
Y = dataframe.iloc[:,8]
    
kfold = StratifiedKFold(n_splits=10,random_state= 2023,shuffle=True)

model = RandomForestClassifier(n_estimators= 200,random_state= 20,max_depth=None)
results = cross_val_score(model, X, Y, cv=kfold)
print(results)
print(results.mean())


# In[ ]:




