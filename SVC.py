#!/usr/bin/env python
# coding: utf-8

# In[6]:


import pandas as pd 
import numpy as np
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV,RandomizedSearchCV
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import train_test_split, cross_val_score,StratifiedKFold


# In[8]:


dataframe = pd.read_csv('diabetes.csv')
dataframe


# In[11]:


array = dataframe.values
X = array[:,0:8]
Y = array[:,8]


# In[13]:


X_train, X_test, Y_train, Y_test = train_test_split(X,Y, test_size = 0.2)


# In[14]:


X_train.shape, Y_train.shape, X_test.shape, Y_test.shape


# In[15]:


clf = SVC()
clf.fit(X_train,Y_train)


# In[16]:


Y_predict = clf.predict(X_test)


# In[17]:


print(classification_report(Y_test,Y_predict))


# In[18]:


accuracy_score(Y_train,clf.predict(X_train))


# In[20]:


Clf = SVC()
param_grid = [{'kernel':['linear','rbf'],'gamma':[0.1,0.5,1],'C':[0.1,1,10] }]
kfold = StratifiedKFold(n_splits=5)
gsv = RandomizedSearchCV(clf,param_grid,cv=kfold,scoring= 'recall')
gsv.fit(X_train,Y_train)


# In[ ]:


gsv.best_params_, gsv.best


# In[ ]:


clf_model = SVC(kernal='linear',C=1)
clf_model.fit(X_train , Y_train)
Y_pred = clf_model

