/**
 * Projects Data with Local Images
 */
const ProjectsData = [
    {
        id: 1,
        title: "Customer Churn Prediction",
        summary: "Predicting customer churn using classification algorithms to help businesses retain customers.",
        category: "classification",
        tags: ["classification", "logistic-regression", "random-forest"],
        icon: "🎯",
        image: "IMG-20251205-WA0001.jpg",
        problem: "Telecom companies lose significant revenue due to customer churn. Early identification of at-risk customers enables proactive retention strategies.",
        dataset: {
            source: "Kaggle Telco Customer Churn Dataset",
            size: "7,043 records, 21 features",
            type: "Structured tabular data with categorical and numerical features"
        },
        methods: ["Logistic Regression", "Random Forest", "Gradient Boosting", "Feature Importance Analysis"],
        preprocessing: [
            "Handled missing values in TotalCharges column",
            "Encoded categorical variables using One-Hot Encoding",
            "Normalized numerical features using StandardScaler",
            "Addressed class imbalance using SMOTE"
        ],
        metrics: {
            accuracy: { value: "82.4%", note: "EXAMPLE VALUE" },
            precision: { value: "79.1%", note: "EXAMPLE VALUE" },
            recall: { value: "76.8%", note: "EXAMPLE VALUE" },
            f1Score: { value: "77.9%", note: "EXAMPLE VALUE" }
        },
        lessons: [
            "Feature engineering significantly impacts model performance",
            "Class imbalance must be addressed for reliable predictions",
            "Ensemble methods often outperform single classifiers"
        ],
        futureWork: [
            "Implement deep learning approaches",
            "Add temporal features for time-series analysis",
            "Deploy model as REST API"
        ],
        reproducibility: {
            environment: "Python 3.9, scikit-learn 1.0, pandas 1.4",
            commands: ["pip install -r requirements.txt", "python src/train_model.py"],
            dataPath: "data/telco_churn.csv"
        },
        repoUrl: "https://github.com/mohamedtayal/churn-prediction"
    },
    {
        id: 2,
        title: "Customer Segmentation Analysis",
        summary: "Clustering customers based on purchasing behavior for targeted marketing strategies.",
        category: "clustering",
        tags: ["clustering", "k-means", "pca"],
        icon: "👥",
        image: "IMG-20251205-WA0002.jpg",
        problem: "Businesses need to understand customer segments to personalize marketing campaigns and improve customer experience.",
        dataset: {
            source: "UCI Mall Customer Dataset",
            size: "200 records, 5 features",
            type: "Customer demographic and spending data"
        },
        methods: ["K-Means Clustering", "Hierarchical Clustering", "PCA for Visualization", "Elbow Method"],
        preprocessing: [
            "Removed customer ID column",
            "Scaled features using MinMaxScaler",
            "Applied PCA for dimensionality reduction",
            "Determined optimal clusters using silhouette score"
        ],
        metrics: {
            silhouette: { value: "0.553", note: "EXAMPLE VALUE" },
            inertia: { value: "44,448", note: "EXAMPLE VALUE" },
            clusters: { value: "5", note: "Optimal K" }
        },
        lessons: [
            "Visualization is crucial for interpreting cluster results",
            "Multiple clustering validation metrics should be used",
            "Domain knowledge helps in naming segments"
        ],
        futureWork: [
            "Apply DBSCAN for density-based clustering",
            "Incorporate more customer features",
            "Build recommendation system"
        ],
        reproducibility: {
            environment: "Python 3.9, scikit-learn 1.0, matplotlib 3.5",
            commands: ["pip install -r requirements.txt", "jupyter notebook notebooks/segmentation.ipynb"],
            dataPath: "data/mall_customers.csv"
        },
        repoUrl: "https://github.com/mohamedtayal/customer-segmentation"
    },
    {
        id: 3,
        title: "COVID-19 Exploratory Data Analysis",
        summary: "Comprehensive EDA of global COVID-19 data revealing trends and patterns across countries.",
        category: "eda",
        tags: ["eda", "visualization", "pandas"],
        icon: "📊",
        image: "IMG-20251205-WA0003.jpg",
        problem: "Understanding the spread and impact of COVID-19 requires thorough analysis of global health data to identify patterns.",
        dataset: {
            source: "Johns Hopkins University COVID-19 Dataset",
            size: "200+ countries, daily records since Jan 2020",
            type: "Time-series epidemiological data"
        },
        methods: ["Statistical Analysis", "Time Series Visualization", "Correlation Analysis", "Geographic Mapping"],
        preprocessing: [
            "Merged multiple data sources",
            "Handled missing country data",
            "Created derived features (daily new cases, growth rate)",
            "Aggregated data by region and time period"
        ],
        metrics: {
            visualizations: { value: "25+", note: "Charts created" },
            insights: { value: "15", note: "Key findings" },
            countries: { value: "180+", note: "Analyzed" }
        },
        lessons: [
            "Data quality varies significantly across sources",
            "Interactive visualizations enhance understanding",
            "Time-series analysis requires careful handling"
        ],
        futureWork: [
            "Add vaccination data correlation",
            "Build interactive dashboard with Plotly",
            "Implement forecasting models"
        ],
        reproducibility: {
            environment: "Python 3.9, pandas 1.4, seaborn 0.11, plotly 5.0",
            commands: ["pip install -r requirements.txt", "jupyter notebook notebooks/covid_eda.ipynb"],
            dataPath: "data/covid_global.csv"
        },
        repoUrl: "https://github.com/mohamedtayal/covid-eda"
    },
    {
        id: 4,
        title: "Market Basket Analysis",
        summary: "Discovering product associations using association rule mining for retail optimization.",
        category: "association",
        tags: ["association", "apriori", "retail"],
        icon: "🛒",
        image: "IMG-20251205-WA0004.jpg",
        problem: "Retailers need to understand which products are frequently purchased together to optimize store layout.",
        dataset: {
            source: "Online Retail Dataset (UCI)",
            size: "541,909 transactions, 4,070 products",
            type: "Transactional retail data"
        },
        methods: ["Apriori Algorithm", "FP-Growth", "Association Rule Mining", "Lift Analysis"],
        preprocessing: [
            "Removed cancelled transactions",
            "Filtered out non-product entries",
            "Created transaction baskets",
            "Applied minimum support threshold"
        ],
        metrics: {
            rules: { value: "847", note: "EXAMPLE VALUE" },
            avgLift: { value: "4.2", note: "EXAMPLE VALUE" },
            avgConfidence: { value: "0.68", note: "EXAMPLE VALUE" }
        },
        lessons: [
            "Support and confidence thresholds significantly affect results",
            "Lift is more reliable than confidence for rule quality",
            "Seasonal patterns affect association rules"
        ],
        futureWork: [
            "Implement sequential pattern mining",
            "Add temporal analysis of associations",
            "Build product recommendation engine"
        ],
        reproducibility: {
            environment: "Python 3.9, mlxtend 0.19, pandas 1.4",
            commands: ["pip install -r requirements.txt", "python src/apriori_analysis.py"],
            dataPath: "data/online_retail.csv"
        },
        repoUrl: "https://github.com/mohamedtayal/market-basket"
    },
    {
        id: 5,
        title: "House Price Prediction",
        summary: "Building regression models to predict housing prices based on property features.",
        category: "regression",
        tags: ["regression", "xgboost", "feature-selection"],
        icon: "🏠",
        image: "IMG-20251205-WA0005.jpg",
        problem: "Accurate house price prediction helps buyers, sellers, and real estate agents make informed decisions.",
        dataset: {
            source: "Kaggle House Prices Dataset",
            size: "1,460 training samples, 80 features",
            type: "Structured housing data with mixed feature types"
        },
        methods: ["Linear Regression", "Ridge/Lasso Regression", "XGBoost", "Feature Selection"],
        preprocessing: [
            "Imputed missing values using median/mode",
            "Log-transformed skewed numerical features",
            "Created polynomial features for key variables",
            "Applied target encoding for high-cardinality categoricals"
        ],
        metrics: {
            rmse: { value: "$24,500", note: "EXAMPLE VALUE" },
            mae: { value: "$18,200", note: "EXAMPLE VALUE" },
            r2: { value: "0.891", note: "EXAMPLE VALUE" }
        },
        lessons: [
            "Feature engineering is crucial for regression tasks",
            "Regularization prevents overfitting",
            "Ensemble methods provide robust predictions"
        ],
        futureWork: [
            "Add neighborhood-level features",
            "Implement neural network approach",
            "Create web application for predictions"
        ],
        reproducibility: {
            environment: "Python 3.9, scikit-learn 1.0, xgboost 1.5",
            commands: ["pip install -r requirements.txt", "python src/train_models.py"],
            dataPath: "data/house_prices.csv"
        },
        repoUrl: "https://github.com/mohamedtayal/house-price-prediction"
    },
    {
        id: 6,
        title: "Credit Card Fraud Detection",
        summary: "Detecting fraudulent transactions using anomaly detection and classification techniques.",
        category: "classification",
        tags: ["classification", "anomaly-detection", "neural-network"],
        icon: "💳",
        image: "IMG-20251205-WA0006.jpg",
        problem: "Financial institutions lose billions annually to credit card fraud. Real-time detection is essential.",
        dataset: {
            source: "Kaggle Credit Card Fraud Dataset",
            size: "284,807 transactions, 30 PCA features",
            type: "Highly imbalanced transaction data (0.17% fraud)"
        },
        methods: ["Isolation Forest", "Random Forest", "Neural Network", "SMOTE Oversampling"],
        preprocessing: [
            "Scaled Amount and Time features",
            "Applied SMOTE for class balancing",
            "Used stratified sampling for train/test split",
            "Implemented threshold optimization"
        ],
        metrics: {
            precision: { value: "94.2%", note: "EXAMPLE VALUE" },
            recall: { value: "89.7%", note: "EXAMPLE VALUE" },
            f1Score: { value: "91.9%", note: "EXAMPLE VALUE" },
            auc: { value: "0.978", note: "EXAMPLE VALUE" }
        },
        lessons: [
            "Recall is more important than precision for fraud detection",
            "Anomaly detection complements supervised learning",
            "Cost-sensitive learning improves business outcomes"
        ],
        futureWork: [
            "Implement real-time streaming detection",
            "Add explainability with SHAP values",
            "Test on more recent transaction data"
        ],
        reproducibility: {
            environment: "Python 3.9, scikit-learn 1.0, tensorflow 2.8",
            commands: ["pip install -r requirements.txt", "python src/train_classifier.py"],
            dataPath: "data/creditcard.csv"
        },
        repoUrl: "https://github.com/mohamedtayal/fraud-detection"
    }
];