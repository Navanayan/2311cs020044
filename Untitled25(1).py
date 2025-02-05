#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import statsmodels.formula.api as smf
from statsmodels.graphics.regressionplots import influence_plot
import numpy as np


# In[2]:


cars = pd.read_csv("Cars.csv")
cars.head()


# In[3]:


# Rearrange the columns
cars = pd.DataFrame(cars, columns=["HP","VOL","SP","WT","MPG"])
cars.head()


# Description of columns
# MPG : Milege of the car(Mile per Gallon)
# HP : Horse power of the car
# VOL : Volume of the car(size)
# SP : Top speed of the car (Miles per Hour)
# WT : Weight of the car (Pounds)

# In[4]:


cars.info()


# In[6]:


#check for missing values
cars.isna().sum()


# Observations
# No missing values are observed here
# The data types of each column are relevant
# There are 81 observation

# In[7]:



fig, (ax_box, ax_hist) = plt.subplots(2, sharex=True, gridspec_kw={"height_ratios": (.15, .85)})

sns.boxplot(data=cars, x='HP', ax=ax_box, orient='h')
ax_box.set(xlabel='')

sns.histplot(data=cars, x='HP', ax=ax_hist, bins=30, kde=True, stat="density")
ax_hist.set(ylabel='Density')

plt.tight_layout()
plt.show()


# In[8]:



fig, (ax_box, ax_hist) = plt.subplots(2, sharex=True, gridspec_kw={"height_ratios": (.15, .85)})

sns.boxplot(data=cars, x='VOL', ax=ax_box, orient='h')
ax_box.set(xlabel='')

sns.histplot(data=cars, x='VOL', ax=ax_hist, bins=30, kde=True, stat="density")
ax_hist.set(ylabel='Density')

plt.tight_layout()
plt.show()


# In[9]:



fig, (ax_box, ax_hist) = plt.subplots(2, sharex=True, gridspec_kw={"height_ratios": (.15, .85)})

sns.boxplot(data=cars, x='WT', ax=ax_box, orient='h')
ax_box.set(xlabel='')

sns.histplot(data=cars, x='WT', ax=ax_hist, bins=30, kde=True, stat="density")
ax_hist.set(ylabel='Density')

plt.tight_layout()
plt.show()


# Observations from boxplot and histograms
# There are some extreme values observed in towards the right tail of SP and HP distributions
# In VOL and WT columns, a few outliers are observed in both tails of their distributions
# The extreme values of cars data may have come from the specially designed nature of cars
# As this is multi-dimensional data, the outliers with respect to spatial dimensions may have to be considered while building the regression model

# In[12]:


cars[cars.duplicated()]


# In[13]:


sns.set_style(style="darkgrid")
sns.pairplot(cars)


# In[14]:


cars.corr()


# ***observations***
# 1. between x and y all the x variables are showing moderate to high correlation to high correlation strengths, highest being between HP and MPG
# 2. Therefore this dataset qualifies for building a multiple linear regression model to predict MPG
# 3. Among x columns (x1,x2,x3 and x4), some very high correlation strengths are observed between SP vs HP, VOL vs WT
# 4. The high correlation among X columns.

# In[15]:


model1 = smf.ols('MPG~WT+VOL+SP+HP', data=cars).fit()


# In[16]:


model1.summary()


# In[ ]:




