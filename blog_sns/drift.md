
I don't want to get fired so I got into the MLOps scene in my current company. I volunteered to help with the design and implementation of an AWS system or design or whatever you want to call it for detecting model drift on an XGBoost Model that tries to predict a category based on 5 arbitrary categories made by the company. My boss insisted on using the EvidentlyAI library and AWS.  The problem was that we did not have the actual values of the predicted datasets...

 I was just as confused as you are but I decided to go along with the project and created this tool.

## How to Use

1. **Get a reference dataset (your baseline data).**  
   This is your reality data-set. Preferably a dataset that the model was trained on.

2. **Prepare your current dataset(s) or predictions.**  
   These are the datasets that the model blindly predicted, make sure both reference and current datasets:
   - Are in CSV format  
   - Have the same column structure  
   - Follow consistent data types  

3. **Generate your config file.**  
   Before uploading to AWS, run `generate_config.py`. This script will create a personalized `config.json` file based on:
   - The columns in your datasets  
   - The tests you choose to perform  

   > **Note**: The script currently supports only **random forests** for feature importance and will automatically detect numerical vs. categorical columns.

---

## Tests Supported by Evidently AI

Below is a list of the tests supported by Evidently AI, along with their respective input identifiers. You can specify these in your generated config file:

| **Test**                           | **Input**            |
|------------------------------------|----------------------|
| Kolmogorov-Smirnov test            | `ks`                 |
| Z-test                             | `z`                  |
| Chi-Squared test                   | `chisquare`          |
| Jensen-Shannon divergence          | `jensenshannon`      |
| Kullback-Leibler divergence        | `kl_div`             |
| Population Stability Index         | `psi`                |
| Wasserstein distance               | `wasserstein`        |
| Anderson-Darling test              | `anderson`           |
| Fisher's exact test                | `fisher_exact`       |
| Student's t-test                   | `t_test`             |
| Cramér-von Mises test              | `cramer_von_mises`   |
| G-test (Likelihood Ratio Test)     | `g_test`             |
| Empirical Maximum Mean Discrepancy | `empirical_mmd`      |
| Total Variation Distance           | `TVD`                |

---

## Config File Generation

When you run `generate_config.py`, you will be prompted to select which tests you want for different columns. The script automatically detects:
- Numerical columns (which can use tests like KS, Z-test, etc.)  
- Categorical columns (which can use tests like Chi-Squared, Fisher’s exact, etc.)  

Your output config file (e.g., `config.json`) might look like the config file in the github repo: [Leave a star, even if you don't like it](https://github.com/manuelarceaguirre/monitorv2)

```json
{
    "reference_data_path": "data/reference/Credit_score_cleaned_data_Aug.csv",
    "local_reference_path": "Credit_score_cleaned_data_Aug.csv",
    "predictions_folder": "data/predictions/",
    "target": "Credit_Score",
    "drop_columns": [
        "Customer_ID"
    ],
    "time_unit_column": "Time",
    "feature_importance_methods": [
        "random_forest"
    ],
    "available_feature_importance_methods": [
        "random_forest",
        "permutation",
        "mutual_info"
    ],
    "monitoring": {
        "drift_threshold": 0.7,
        "sns_topic_arn": "arn:aws:sns:us-east-1:345594570065:firstsns"
    },
    "drift_tests": {
        "default": {
            "numerical": [
                "ks"
            ],
            "categorical": [
                "chisquare"
            ],
            "binary": [
                "z"
            ]
        },
        "columns": {
            "Age": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Occupation": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Annual_Income": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Monthly_Inhand_Salary": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Num_Bank_Accounts": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Num_Credit_Card": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Interest_Rate": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Num_of_Loan": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Delay_from_due_date": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Num_of_Delayed_Payment": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Changed_Credit_Limit": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Num_Credit_Inquiries": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Credit_Mix": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Outstanding_Debt": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Credit_Utilization_Ratio": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Credit_History_Age": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Payment_of_Min_Amount": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Total_EMI_per_month": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Amount_invested_monthly": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Payment_Behaviour": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Monthly_Balance": {
                "type": "numerical",
                "tests": [
                    "ks"
                ]
            },
            "Last_Loan_9": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Last_Loan_8": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Last_Loan_7": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Last_Loan_6": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Last_Loan_5": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Last_Loan_4": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Last_Loan_3": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Last_Loan_2": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            },
            "Last_Loan_1": {
                "type": "categorical",
                "tests": [
                    "chisquare"
                ]
            }
        },
        "available_drift_tests": {
            "numerical": [
                "ks",
                "wasserstein",
                "anderson",
                "psi",
                "kl_div",
                "t_test",
                "empirical_mmd",
                "cramer_von_mises"
            ],
            "categorical": [
                "chisquare",
                "psi",
                "jensenshannon",
                "fisher_exact",
                "g_test",
                "hellinger",
                "TVD",
                "kl_div"
            ],
            "binary": [
                "z",
                "fisher_exact"
            ]
        },
        "drift_thresholds": {
            "dataset_drift_share": 0.1,
            "test_thresholds": {
                "ks": 0.05,
                "wasserstein": 0.1,
                "anderson": 0.05,
                "psi": 0.2,
                "kl_div": 0.2,
                "jensenshannon": 0.1,
                "chisquare": 0.05,
                "fisher_exact": 0.05,
                "g_test": 0.05,
                "hellinger": 0.1,
                "TVD": 0.1,
                "mannw": 0.05,
                "ed": 0.1,
                "es": 0.05,
                "t_test": 0.05,
                "empirical_mmd": 0.1,
                "cramer_von_mises": 0.05,
                "z": 0.05
            }
        }
    },
    "results_json_path": "analysis_results.json",
    "output_csv_path": "feature_analysis.csv"
}
```

---

## AWS Setup

### S3 Bucket Structure

Your AWS S3 bucket should be organized as follows:

your-bucket/
├── config/
│   └── config.json
├── data/
│   ├── reference/
│   │   └── reference_dataset.csv
│   └── predictions/
│       └── current_dataset.csv
└── results/
    └── feature_analysis.csv

    
- **config/** folder: Contains `config.json` generated by `generate_config.py`.
- **data/reference/** folder: Contains your reference (baseline) dataset in CSV format.
- **data/predictions/** folder: Contains your current dataset(s) in CSV format.
- **results/** folder: Will hold output files such as `feature_analysis.csv`.

---

### Build & Push Docker Image to ECR

1. **Install AWS CLI**  
   Make sure you have the AWS CLI installed and configured with your credentials.

2. **Build the Docker image**  
   ```bash
   docker build -t your-image-name .
   ```

3. **Authenticate Docker to ECR**  
   ```bash
   aws ecr get-login-password --region your-region | \
       docker login --username AWS \
       --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
   ```

4. **Tag the Docker image**  
   ```bash
   docker tag your-image-name:latest \
       your-account-id.dkr.ecr.your-region.amazonaws.com/your-repo-name:latest
   ```

5. **Push the Docker image to ECR**  
   ```bash
   docker push your-account-id.dkr.ecr.your-region.amazonaws.com/your-repo-name:latest
   ```

---

### SNS Topic Setup

Using the AWS Management Console:

1. Sign in to the **AWS Console** and navigate to **SNS**.  
2. Click on **Topics** and then **Create topic**.  
3. Choose **Standard** or **FIFO** topic type.  
4. Enter a name for your topic (e.g., `DataDriftNotifications`).  
5. Click **Create topic**.  
6. Note the **Topic ARN** for use in your `config.json`.

---

### Lambda Setup

1. Open the AWS **Management Console** and navigate to the **Lambda** service.  
2. Click on **Create function**.  
3. Choose **Container image** as the function type.  
4. Enter a name for your function (e.g., `DataDriftAnalysisFunction`).  
5. In the **Container image URI** field, enter the URI of your Docker image in ECR (e.g., `123456789012.dkr.ecr.us-east-1.amazonaws.com/your-image-name:latest`).  
6. Click on **Create function**.  
7. In the **Configuration** tab:  
   - Go to **General configuration** and set the **Memory** (e.g., 512 MB or more) and **Timeout** (e.g., 5 minutes).  
   - Go to **Environment variables** and add the following variable:  
     - `SNS_TOPIC_ARN`: Set this to the ARN of your SNS topic (e.g., `arn:aws:sns:us-east-1:345594570065:firstsns`).  

To test the Lambda function, you can use the following test event JSON:

```json
{
  "Records": [
    {
      "eventVersion": "2.1",
      "eventSource": "aws:s3",
      "awsRegion": "us-east-1",
      "eventTime": "2024-12-08T04:30:29.000Z",
      "eventName": "ObjectCreated:Put",
      "s3": {
        "bucket": {
          "name": "monitorsnsdemo-manuel-2024",
          "arn": "arn:aws:s3:::monitorsnsdemo-manuel-2024"
        },
        "object": {
          "key": "data/predictions/Credit_score_cleaned_data_Sep.csv",
          "size": 1024
        }
      }
    }
  ]
}
```

---

## Event Notifications on S3

1. Select the bucket (e.g., `monitorsnsdemo-manuel-2024`) where your **predictions** folder is located.  
2. Go to the **Properties** tab of the bucket.  
3. Scroll down to the **Event notifications** section and click on **Create event notification**.  
4. Configure the following settings:  
   - **Event name**: e.g., `NewCSVUpload`  
   - **Event types**: `All object create events` or specifically `PUT`  
   - **Prefix**: `data/predictions/`  
   - **Suffix**: `.csv`  
   - **Destination**: **Lambda function**, and select your `DataDriftAnalysisFunction`.  
5. Click **Save changes** to apply the notification settings.

---

## IAM Roles & Permissions

### 1. IAM Role for Lambda Function

Create an IAM role for your Lambda function with the following trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Attach a permissions policy that allows:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::monitorsnsdemo-manuel-2024",
        "arn:aws:s3:::monitorsnsdemo-manuel-2024/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "sns:Publish"
      ],
      "Resource": "arn:aws:sns:us-east-1:345594570065:firstsns"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "lambda:InvokeFunction"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2. IAM User Permissions

For an IAM user that will manage this setup, attach permissions that allow actions on Lambda, S3, and SNS:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration",
        "lambda:DeleteFunction",
        "lambda:GetFunction",
        "lambda:ListFunctions",
        "lambda:InvokeFunction"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:PutBucketNotification",
        "s3:GetBucketNotification",
        "s3:ListBucket",
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::monitorsnsdemo-manuel-2024",
        "arn:aws:s3:::monitorsnsdemo-manuel-2024/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "sns:CreateTopic",
        "sns:DeleteTopic",
        "sns:ListTopics",
        "sns:Subscribe",
        "sns:Unsubscribe",
        "sns:GetTopicAttributes",
        "sns:SetTopicAttributes"
      ],
      "Resource": "arn:aws:sns:us-east-1:345594570065:firstsns"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:GetLogEvents",
        "logs:FilterLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## Now what?

You now have a clear path to:
1. Prepare your data in CSV format with matching columns.  
2. Generate a config file with the tests you need.  
3. Deploy a Docker image to AWS ECR containing your code.  
4. Configure an SNS topic to receive notifications.  
5. Set up a Lambda function to automatically perform data drift analysis whenever a new CSV is uploaded to S3.  

This setup ensures that you can detect data drift for both numerical and categorical features using Evidently AI’s various statistical tests, and receive notifications in real-time through AWS services.



