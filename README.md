# Payment Fraud Detection Using Machine Learning Models

A machine learning project for detecting fraudulent online payment transactions. The project combines exploratory data analysis, dataset balancing, feature engineering, model training, model evaluation, and a static web interface called **FraudShield** for presenting fraud detection insights and transaction risk predictions.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Repository Structure](#repository-structure)
- [Dataset](#dataset)
- [Machine Learning Workflow](#machine-learning-workflow)
- [Models Used](#models-used)
- [Evaluation Metrics](#evaluation-metrics)
- [Web Application](#web-application)
- [Installation and Setup](#installation-and-setup)
- [How to Run](#how-to-run)
- [Expected Outputs](#expected-outputs)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Project Overview

Payment fraud is a major risk in digital banking, online transfers, and financial platforms. Fraudulent transactions are usually rare compared with legitimate transactions, which makes this a class imbalance problem. A model that only predicts "not fraud" can still look accurate, so this project focuses on building and comparing multiple machine learning models using fraud-specific evaluation metrics such as precision, recall, F1-score, and ROC-AUC.

The main goal of this project is to classify each payment transaction as:

- `0`: Legitimate transaction
- `1`: Fraudulent transaction

The core machine learning implementation is available in the Jupyter notebooks inside the nested project folder. The root folder also includes a static dashboard interface that visualizes model results and simulates transaction risk scoring.

## Key Features

- Exploratory data analysis of online payment transactions.
- Handling of severe class imbalance through upsampling and downsampling experiments.
- Feature engineering based on account balance changes and transaction amount behavior.
- Training and comparison of multiple supervised machine learning algorithms.
- Model evaluation using classification metrics suitable for fraud detection.
- Static frontend dashboard for presenting project insights.
- Transaction prediction form that simulates fraud risk using dataset-inspired heuristics.
- Charts and visual summaries powered by Chart.js.

## Repository Structure

```text
.
|-- README.md
|-- project_summary.md
|-- index.html
|-- index.css
|-- app.js
|-- .gitignore
`-- Payment-Fraud-Detection-using-Machine-Learning-models-main/
    |-- Final_Project.ipynb
    `-- balanced_dataset_updated[1].ipynb
```

### Important Files

| File | Description |
| --- | --- |
| `README.md` | Detailed project documentation. |
| `project_summary.md` | Existing technical summary of the project pipeline. |
| `index.html` | Static FraudShield web app markup. |
| `index.css` | Styling for the landing page, dashboard, forms, cards, and charts. |
| `app.js` | Frontend navigation, chart rendering, and heuristic prediction logic. |
| `Final_Project.ipynb` | Main notebook for preprocessing, training, and evaluating ML models. |
| `balanced_dataset_updated[1].ipynb` | Notebook focused on EDA and dataset balancing using upsampling/downsampling. |

## Dataset

This project is based on an online payment fraud detection dataset originally available on Kaggle as `jainilcoder/online-payment-fraud-detection`.

The dataset contains millions of transaction records with fields such as:

| Column | Description |
| --- | --- |
| `step` | Time step of the transaction. One step represents one hour. |
| `type` | Transaction type, such as `PAYMENT`, `TRANSFER`, `CASH_OUT`, `DEBIT`, or `CASH_IN`. |
| `amount` | Transaction amount. |
| `nameOrig` | Identifier of the transaction sender. |
| `oldbalanceOrg` | Sender balance before the transaction. |
| `newbalanceOrig` | Sender balance after the transaction. |
| `nameDest` | Identifier of the transaction receiver. |
| `oldbalanceDest` | Receiver balance before the transaction. |
| `newbalanceDest` | Receiver balance after the transaction. |
| `isFraud` | Target label indicating whether the transaction is fraudulent. |

The original dataset is highly imbalanced. Fraud cases represent only a very small portion of all transactions, so the project explores balancing techniques before model training.

> Note: Large CSV files are ignored by `.gitignore`, so the dataset is not expected to be committed directly to this repository.

## Machine Learning Workflow

The project follows a typical supervised machine learning pipeline:

1. **Load the dataset**
   - Import transaction records into a pandas DataFrame.
   - Inspect shape, data types, missing values, and class distribution.

2. **Exploratory Data Analysis**
   - Analyze transaction types.
   - Compare fraud and legitimate transaction behavior.
   - Visualize class imbalance.
   - Study relationships between balances, amount, and fraud labels.

3. **Class Imbalance Handling**
   - Experiment with upsampling the minority fraud class.
   - Experiment with downsampling the majority legitimate class.
   - Use a balanced dataset for fairer model learning.

4. **Feature Cleaning**
   - Drop high-cardinality identifier columns such as `nameOrig` and `nameDest`.
   - Encode categorical columns where needed.
   - Prepare numerical features for model training.

5. **Feature Engineering**
   - Create balance-change based features.
   - Create relative transaction amount features.
   - Use transaction type patterns to support fraud classification.

6. **Feature Scaling**
   - Apply `StandardScaler` where required.
   - Scaling is especially useful for algorithms such as Logistic Regression, KNN, SVM, and Perceptron.

7. **Train-Test Split**
   - Split the dataset into training and testing sets.
   - Train models on the training set.
   - Evaluate model generalization on the test set.

8. **Model Training and Evaluation**
   - Train multiple classifiers.
   - Generate classification reports.
   - Compare accuracy, precision, recall, F1-score, and ROC-AUC.

## Models Used

The main notebook trains and evaluates several machine learning classifiers:

| Model | Purpose |
| --- | --- |
| Logistic Regression | Linear baseline model for binary classification. |
| Gaussian Naive Bayes | Probabilistic baseline model. |
| Decision Tree Classifier | Interpretable tree-based classifier. |
| Random Forest Classifier | Ensemble of decision trees for improved robustness. |
| Gradient Boosting Classifier | Boosted ensemble model for stronger predictive performance. |
| Perceptron | Linear classifier useful as a simple neural-style baseline. |
| K-Nearest Neighbors | Distance-based classifier. |
| Support Vector Classifier | Margin-based classifier for classification boundaries. |

## Evaluation Metrics

Fraud detection should not be judged by accuracy alone because fraud cases are rare. This project uses the following metrics:

| Metric | Meaning |
| --- | --- |
| Accuracy | Overall percentage of correct predictions. |
| Precision | Of all transactions predicted as fraud, how many were actually fraud. |
| Recall | Of all actual fraud transactions, how many were detected. |
| F1-Score | Harmonic mean of precision and recall. |
| ROC-AUC | Ability of the model to separate fraud and legitimate classes across thresholds. |
| Confusion Matrix | Breakdown of true positives, true negatives, false positives, and false negatives. |

For fraud detection, recall is especially important because missing fraud can lead to financial loss. Precision is also important because too many false positives can block legitimate customers.

## Web Application

The repository includes a static frontend called **FraudShield**.

The app includes:

- Landing page introducing the fraud detection system.
- Dashboard with fraud statistics and charts.
- Model performance visualization.
- Recent predictions table.
- Transaction prediction form.
- Model insights page.
- About page describing the system.

The frontend uses:

- HTML
- CSS
- JavaScript
- Chart.js from CDN
- Google Fonts from CDN

### Important Frontend Note

The web app prediction form currently uses JavaScript heuristic scoring in `app.js`. It does not load a trained Python model directly. The prediction logic is intended as a demo interface inspired by fraud patterns from the dataset, such as:

- Fraud appearing mainly in `TRANSFER` and `CASH_OUT` transactions.
- Large transaction amounts.
- Sender balance being drained to zero.
- Balance mismatch between expected and actual values.
- Receiver account anomalies.

For production use, the trained model and scaler should be exported from the notebook and served through an API.

## Installation and Setup

### 1. Clone or Download the Repository

```bash
git clone <repository-url>
cd Payment-Fraud-Detection-using-Machine-Learning-models-main
```

If you downloaded the ZIP file, extract it and open the extracted folder.

### 2. Create a Python Environment

```bash
python -m venv .venv
```

Activate the environment:

```bash
# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

### 3. Install Python Dependencies

The notebooks use common data science and machine learning libraries:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn jupyter
```

Optional packages for saving models:

```bash
pip install joblib
```

### 4. Add the Dataset

Download the online payment fraud dataset from Kaggle and place the CSV file in the project folder or update the notebook path to match your local dataset location.

Because `.gitignore` excludes `*.csv`, dataset files will remain local and will not be committed.

## How to Run

### Run the Machine Learning Notebooks

Start Jupyter Notebook:

```bash
jupyter notebook
```

Open the notebooks from:

```text
Payment-Fraud-Detection-using-Machine-Learning-models-main/
```

Recommended order:

1. `balanced_dataset_updated[1].ipynb`
2. `Final_Project.ipynb`

Run the cells from top to bottom.

### Run the Web App

The frontend is static, so no build step is required.

Option 1: Open `index.html` directly in a browser.

Option 2: Serve the folder locally:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Expected Outputs

After running the notebooks, you should see:

- Dataset summary and EDA outputs.
- Class distribution visualizations.
- Balanced dataset experiments.
- Trained model results.
- Classification reports.
- Confusion matrices.
- Performance comparisons across multiple classifiers.

After opening the web app, you should see:

- FraudShield landing page.
- Interactive dashboard charts.
- Prediction form for transaction details.
- Simulated fraud risk result with probability, risk level, and key risk factors.

## Limitations

- The frontend prediction result is heuristic-based and not connected to a trained backend model.
- The original dataset is extremely imbalanced, so sampling strategy affects model performance.
- Default model hyperparameters may not produce optimal results.
- Large raw CSV files are not included in the repository.
- Notebook paths may need adjustment depending on where the dataset is stored locally.
- Real payment fraud systems require monitoring, explainability, threshold tuning, and compliance review before deployment.

## Future Enhancements

Recommended improvements include:

- Export the best trained model using `joblib` or `pickle`.
- Export the fitted scaler and preprocessing steps with the model.
- Build a Flask or FastAPI backend for real-time prediction.
- Connect the frontend form to the backend API.
- Add model persistence and versioning.
- Add hyperparameter tuning with `GridSearchCV` or `RandomizedSearchCV`.
- Try imbalance handling methods such as SMOTE or class-weighted models.
- Add feature importance charts from Random Forest or Gradient Boosting.
- Add automated tests for preprocessing and prediction logic.
- Add a `requirements.txt` file for reproducible setup.
- Add deployment instructions for cloud hosting.

## Example Production Architecture

```text
User Interface
     |
     v
Frontend App
     |
     v
Prediction API
     |
     v
Preprocessing Pipeline + Trained ML Model
     |
     v
Fraud / Legitimate Prediction
```

## Contributing

Contributions are welcome. Useful contribution areas include:

- Improving notebook organization.
- Adding a `requirements.txt` file.
- Improving model tuning.
- Connecting the frontend to a real model API.
- Adding tests and reproducible experiment scripts.
- Improving dashboard visualizations.

## Disclaimer

This project is intended for educational and experimental use. It should not be used as a production fraud detection system without additional validation, security review, compliance checks, and monitoring.
