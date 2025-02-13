# Magazine Subscription Service - Backend Assignment

## Overview
This project implements a backend service for a magazine subscription system. It fulfills the requirements of managing users, magazines, subscription plans, and subscriptions through RESTful APIs. The backend is developed using **Node.js**, **MongoDB**, and optionally **Next.js** for API routing and future frontend integration.

---

## Features

### User Management
1. **Register**: Create a new user account.
2. **Login**: Authenticate an existing user.
3. **Reset Password**: Reset the user's password.

### Magazine Management
1. Retrieve a list of magazines available for subscription.
2. Each magazine includes:
   - `name`
   - `description`
   - `base_price`
   - Associated subscription plans.

### Subscription Management
1. **Create a subscription** for a magazine.
2. **Retrieve active subscriptions** for a user.
3. **Modify a subscription**:
   - Users can change their subscription plan for a magazine.
   - Old subscriptions are marked inactive, and new subscriptions are created with updated details.
4. **Deactivate a subscription**:
   - Subscriptions are never deleted but marked as inactive.

---

## Data Models

### 1. Magazine
Represents a magazine available for subscription.

| Field         | Type   | Description                              |
|---------------|--------|------------------------------------------|
| `name`        | String | Name of the magazine                    |
| `description` | String | Short description of the magazine       |
| `base_price`  | Number | Monthly subscription price ( > 0)       |

---

### 2. Plan
Represents subscription plans for magazines.

| Field            | Type    | Description                                      |
|------------------|---------|--------------------------------------------------|
| `title`          | String  | Plan title (e.g., Silver, Gold, Platinum, etc.) |
| `description`    | String  | Description of the plan                         |
| `renewalPeriod`  | Number  | Number of months for subscription renewal       |
| `discount`       | Decimal | Discount as a percentage (e.g., 0.10 = 10%)    |
| `tier`           | Number  | Tier level of the plan                          |

#### Plans Supported:

| Plan      | Renewal Period | Discount (%) | Tier |
|-----------|----------------|--------------|------|
| Silver    | 1 month        | 0%           | 1    |
| Gold      | 3 months       | 5%           | 2    |
| Platinum  | 6 months       | 10%          | 3    |
| Diamond   | 12 months      | 25%          | 4    |

---

### 3. Subscription
Tracks the user's subscription for a magazine.

| Field          | Type      | Description                                         |
|----------------|-----------|-----------------------------------------------------|
| `user_id`      | ObjectId  | ID of the user                                      |
| `magazine_id`  | ObjectId  | ID of the magazine                                  |
| `plan_id`      | ObjectId  | ID of the associated plan                           |
| `price`        | Number    | Final price after applying the plan discount       |
| `renewal_date` | Date      | Next renewal date                                  |
| `is_active`    | Boolean   | Indicates whether the subscription is active       |

---

## Business Rules

1. A user can have only one **active subscription** per magazine at a time.
2. If a subscription is modified:
   - The existing subscription is marked as inactive.
   - A new subscription is created based on the new plan.
   - No proration of funds or refunds are handled.
3. Subscriptions are never deleted from the database. Inactive subscriptions are retained for historical purposes.

---

## REST API Endpoints

### **Authentication Routes**
| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| POST   | `/auth/register`   | Register a new user   |
| POST   | `/auth/login`      | Authenticate user     |
| POST   | `/auth/reset`      | Reset password        |

### **Magazine Routes**
| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| GET    | `/magazines`       | Retrieve list of all magazines     |

### **Subscription Routes**
| Method | Endpoint               | Description                                |
|--------|------------------------|--------------------------------------------|
| POST   | `/subscriptions`       | Create a new subscription                 |
| GET    | `/subscriptions`       | Retrieve all active subscriptions         |
| PUT    | `/subscriptions/:id`   | Modify a subscription (change the plan)   |
| DELETE | `/subscriptions/:id`   | Deactivate a subscription                 |

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AliQas-7/Magazine_Subscription_Service/tree/main
   cd magazine-subscription
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Seed the database with plans:
   Run 
node utils/seedMagazines.js
node utils/seedPlans.js


6. Start the server:
   ```bash
   npm run dev
   ```

7. Access the API at `http://localhost:5000/api`.

---

## Testing the API

Use **Postman** or any API client to test the endpoints. Example requests are included in the Postman collection.

### Example Postman Requests:
- **Create Subscription**:
  ```json
  POST /subscriptions
  {
    "magazine_id": "<magazine_id>",
    "plan_id": "<plan_id>"
  }
  ```
- **Modify Subscription**:
  ```json
  PUT /subscriptions/:id
  {
    "new_plan_id": "<new_plan_id>"
  }
  ```
- **Deactivate Subscription**:
  ```json
  DELETE /subscriptions/:id
  ```

---

## Next.js Integration
While the backend is functional with Node.js, it can be migrated to Next.js for:
- API routes within `pages/api`.
- Easy deployment with platforms like Vercel.

---

## Future Enhancements
1. Implement frontend interfaces using Next.js pages for user interaction.
2. Add email notifications for subscription renewals.
3. Support for proration and refunds on subscription modifications.

---

## Author
Prepared as part of a backend assignment. For inquiries, contact roman10132526@gmail.com.

