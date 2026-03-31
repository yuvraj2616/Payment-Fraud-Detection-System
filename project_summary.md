# Payment Fraud Detection using Machine Learning

This document provides a comprehensive overview of the "Payment Fraud Detection" project, detailing its purpose, data pipeline, and the machine learning models implemented.

## 1. Project Overview
The objective of this project is to build a robust machine learning pipeline capable of detecting fraudulent online payment transactions. By analyzing historical transaction patterns, the models aim to accurately classify whether a new transaction is fraudulent or legitimate. 

The primary codebase for this project resides in Jupyter Notebooks (`Final_Project.ipynb` and `balanced_dataset_updated[1].ipynb`).

## 2. Dataset Description
The project leverages a large-scale online payment fraud dataset (originally from Kaggle, specifically `jainilcoder/online-payment-fraud-detection`). 
- **Observations:** Over 6 million transaction records.
- **Class Imbalance:** Highly imbalanced, with fraudulent transactions representing only a small fraction of the total dataset (~8200 fraud cases).
- **Key Features:**
  - `step`: Maps a unit of time in the real world (1 step = 1 hour of time).
  - `type`: Type of transaction (e.g., PAYMENT, TRANSFER, CASH_OUT, DEBIT, CASH_IN).
  - `amount`: Transaction amount.
  - `nameOrig` & `nameDest`: Customer and recipient identifiers.
  - `oldbalanceOrg` & `newbalanceOrig`: Originator's account balance before and after the transaction.
  - `oldbalanceDest` & `newbalanceDest`: Recipient's account balance before and after the transaction.
  - `isFraud`: Target variable (1 for fraud, 0 for legitimate).

## 3. Data Preprocessing & Feature Engineering
To prepare the dataset for machine learning models, several data cleaning and feature engineering steps were executed:
- **Downsampling / Balancing:** A preprocessed sub-dataset (`final_dataset_down.csv`) is utilized to combat the extreme class imbalance, ensuring models do not heavily bias towards the negative class.
- **Feature Dropping:** Identifiers like `nameOrig` and `nameDest` were dropped as they are highly cardinal and do not generalize well.
- **Feature Engineering:**
  - `balance_change`: Calculated as the difference between the old and new balance of the originator (`oldbalanceOrg - newbalanceOrig`).
  - `relativeAmountOrig`: A normalized feature representing how large the transaction amount is relative to the originator's initial balance (`amount / (oldbalanceOrg + 1e-5)`).
- **Normalization:** The features were scaled using `StandardScaler` to ensure algorithms converge quickly and aren't biased by absolute magnitudes of the currency.
- **Data Splitting:** The data was partitioned into a 75% training set and a 25% testing set using `train_test_split`.

## 4. Machine Learning Models Evaluated
A broad spectrum of machine learning classifiers was trained to establish strong numerical baselines. The algorithms implemented include:

1. **Logistic Regression**
2. **Naive Bayes (GaussianNB)**
3. **Decision Tree Classifier**
4. **Random Forest Classifier**
5. **Gradient Boosting Classifier**
6. **Perceptron**
7. **K-Nearest Neighbors (KNN)**
8. **Support Vector Machine (SVC)**

### Evaluation Metrics
The models were evaluated comprehensively to look beyond just raw accuracy since the problem involves fraud detection. Metrics included:
- **Accuracy:** The basic proportion of correctly predicted transactions.
- **Precision:** The proportion of predicted frauds that were actually fraud (key for reducing false positives/customer friction).
- **Recall (Sensitivity):** The proportion of real frauds caught by the model (key for minimizing financial loss).
- **F1-Score:** The harmonic mean of precision and recall.
- **ROC-AUC Score:** Evaluates the models' distinguishing capability across various probability thresholds.

*Note: Initial baseline implementations (e.g., Logistic Regression) achieved relatively strong training and testing accuracies (approx. ~89% - 91%), but advanced tree models (Random Forest, Gradient Boosting) scale better across complex thresholds.*

## 5. Next Steps & Recommendations
There are several avenues identified to optimize this pipeline further towards production-level robustness:

> [!TIP]
> **Hyperparameter Tuning**
> Current models leverage default hyperparameter configurations. Utilizing `GridSearchCV` or `RandomizedSearchCV` on advanced models like Random Forest and Gradient Boosting will likely yield significant performance improvements.

> [!NOTE]
> **Recursive Feature Elimination (RFE)**
> Some cells in the notebook experiment with RFE. Expanding this to finalize a subset of the most critical predictors will make the model faster to invoke in real-time.

> [!IMPORTANT]
> **Model Deployment**
> To integrate this logic into a real-time banking or payment portal, the chosen champion model and the `StandardScaler` should be exported (using `joblib` or `pickle`) and served behind a lightweight API (e.g., utilizing FastAPI or Flask).

> [!WARNING]
> **Handling Data Imbalance (Midsem Feedback)**
> As noted in the project notebooks, alternative imbalance handling techniques should be trialed if the sampled dataset loses too much information. Synthesizing data points with SMOTE (Synthetic Minority Over-sampling Technique) may preserve the rich negative-class variety while bolstering the fraud minority.
