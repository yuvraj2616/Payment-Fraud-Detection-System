# Payment Fraud Detection Using Machine Learning

This project detects whether an online payment transaction is **fraudulent** or **legitimate** using machine learning models.

It also includes a simple web interface called **FraudShield**, which shows a dashboard, model insights, and a transaction prediction form.

## About the Project

Online payment fraud is a common problem in digital transactions. Fraudulent transactions are usually very few compared to normal transactions, so detecting them can be difficult.

The main aim of this project is to train machine learning models that can learn patterns from transaction data and predict fraud more accurately.

## Features

- Payment fraud detection using machine learning.
- Data analysis and preprocessing in Jupyter Notebook.
- Handling imbalanced data using sampling techniques.
- Training and comparing different ML models.
- Simple dashboard for showing model results.
- Transaction prediction form in the web app.

## Project Files

```text
.
|-- README.md
|-- project_summary.md
|-- index.html
|-- index.css
|-- app.js
`-- Payment-Fraud-Detection-using-Machine-Learning-models-main/
    |-- Final_Project.ipynb
    `-- balanced_dataset_updated[1].ipynb
```

## Dataset

The project uses an online payment fraud detection dataset from Kaggle.

The dataset contains transaction details such as:

- Transaction type
- Transaction amount
- Sender balance before and after payment
- Receiver balance before and after payment
- Fraud label

The target column is:

- `isFraud = 0` means the transaction is normal
- `isFraud = 1` means the transaction is fraudulent

## Machine Learning Models Used

The project compares multiple machine learning models:

- Logistic Regression
- Naive Bayes
- Decision Tree
- Random Forest
- Gradient Boosting
- Perceptron
- K-Nearest Neighbors
- Support Vector Machine

## Basic Workflow

1. Load the dataset.
2. Analyze the data.
3. Clean and prepare the data.
4. Balance the fraud and non-fraud records.
5. Train different machine learning models.
6. Test the models.
7. Compare their performance.

## Evaluation Metrics

The models are checked using:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion matrix

These metrics help understand how well the models detect fraud.

## Web App

The web app is made using:

- HTML
- CSS
- JavaScript
- Chart.js

It includes:

- Landing page
- Dashboard
- Prediction form
- Model insights page
- About page

Note: The web app currently uses simple JavaScript logic to show predictions. It is a demo interface and is not directly connected to the trained machine learning model.

## How to Run the Project

### Run the Notebooks

Install the required Python libraries:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn jupyter
```

Start Jupyter Notebook:

```bash
jupyter notebook
```

Then open the notebook files:

- `balanced_dataset_updated[1].ipynb`
- `Final_Project.ipynb`

Run the cells step by step.

### Run the Web App

Open this file in a browser:

```text
index.html
```

You can also run it with a local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Requirements

- Python
- Jupyter Notebook
- pandas
- numpy
- matplotlib
- seaborn
- scikit-learn
- Web browser

## Future Improvements

- Connect the web app with the trained ML model.
- Add a backend using Flask or FastAPI.
- Improve model accuracy with hyperparameter tuning.
- Add more graphs and visualizations.
- Save the best trained model for future use.

## Conclusion

This project shows how machine learning can be used to detect payment fraud. It includes both notebook-based model training and a simple frontend interface to present the results in an easy-to-understand way.
