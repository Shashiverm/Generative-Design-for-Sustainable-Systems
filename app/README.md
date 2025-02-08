# EcoDesign AI - Development Documentation

## Table of Contents
1. [Project Setup](#project-setup)
2. [Development Environment](#development-environment)
3. [Architecture Overview](#architecture-overview)
4. [Service Implementation](#service-implementation)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Testing Guidelines](#testing-guidelines)
8. [Deployment Process](#deployment-process)
9. [Security Guidelines](#security-guidelines)
10. [Contributing Guidelines](#contributing-guidelines)

## Project Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker
- Kubernetes
- MongoDB
- Redis

### Initial Setup
\`\`\`bash
# Clone the repository
git clone https://github.com/ecodesign-ai/platform.git

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # or \`venv\Scripts\activate\` on Windows
pip install -r requirements.txt
\`\`\`

### Environment Configuration
\`\`\`env
# .env.example
MONGODB_URI=mongodb://localhost:27017/ecodesign
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_key
\`\`\`

## Development Environment

### VSCode Setup
\`\`\`json
{
  "editor.formatOnSave": true,
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
\`\`\`

### Docker Development Environment
\`\`\`yaml
# docker-compose.dev.yml
version: '3.8'
services:
  frontend:
    build: 
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
\`\`\`

## Architecture Overview

### Frontend Structure
\`\`\`
frontend/
├── src/
│   ├── components/
│   │   ├── design/
│   │   ├── simulation/
│   │   └── analytics/
│   ├── pages/
│   ├── services/
│   └── utils/
\`\`\`

### Backend Structure
\`\`\`
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── services/
│   └── utils/
├── tests/
└── config/
\`\`\`

## Service Implementation

### Design Generation Service
\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

class DesignRequest(BaseModel):
    building_type: str
    location: dict
    constraints: dict
    environmental_factors: list

@app.post("/api/v1/designs")
async def generate_design(request: DesignRequest):
    try:
        result = await design_service.generate(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
\`\`\`

### Environmental Simulation Service
\`\`\`python
class SimulationService:
    def __init__(self):
        self.model = load_simulation_model()
        
    async def run_simulation(self, design_data: dict):
        environmental_factors = await self.get_environmental_data(
            design_data['location']
        )
        return self.model.simulate(design_data, environmental_factors)
\`\`\`

## API Documentation

### Authentication
\`\`\`typescript
interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
\`\`\`

### Design API Endpoints
\`\`\`
POST /api/v1/designs
GET /api/v1/designs/{design_id}
PUT /api/v1/designs/{design_id}
DELETE /api/v1/designs/{design_id}
\`\`\`

## Database Schema

### MongoDB Collections

#### Designs Collection
\`\`\`javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  name: String,
  type: String,
  location: {
    latitude: Number,
    longitude: Number,
    altitude: Number
  },
  parameters: {
    area: Number,
    height: Number,
    orientation: Number
  },
  environmental_factors: [{
    type: String,
    value: Number,
    timestamp: Date
  }],
  created_at: Date,
  updated_at: Date
}
\`\`\`

#### Performance Metrics Collection
\`\`\`javascript
{
  _id: ObjectId,
  design_id: ObjectId,
  energy_efficiency: Number,
  resource_usage: {
    water: Number,
    electricity: Number,
    materials: Object
  },
  sustainability_score: Number,
  timestamp: Date
}
\`\`\`

## Testing Guidelines

### Unit Testing
\`\`\`python
# backend/tests/test_design_service.py
import pytest
from app.services.design import DesignService

@pytest.fixture
def design_service():
    return DesignService()

def test_design_generation(design_service):
    request = {
        "building_type": "residential",
        "location": {"lat": 40.7128, "lng": -74.0060},
        "constraints": {"max_height": 100}
    }
    result = design_service.generate(request)
    assert result is not None
    assert "design_id" in result
\`\`\`

### Integration Testing
\`\`\`python
async def test_end_to_end_design_flow():
    # Create design
    design_data = {...}
    response = await client.post("/api/v1/designs", json=design_data)
    design_id = response.json()["design_id"]
    
    # Run simulation
    sim_response = await client.post(
        f"/api/v1/designs/{design_id}/simulate"
    )
    assert sim_response.status_code == 200
\`\`\`

## Deployment Process

### Kubernetes Deployment
\`\`\`yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ecodesign-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ecodesign-backend
  template:
    metadata:
      labels:
        app: ecodesign-backend
    spec:
      containers:
      - name: ecodesign-backend
        image: ecodesign/backend:latest
        ports:
        - containerPort: 8000
\`\`\`

### CI/CD Pipeline
\`\`\`yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - pip install -r requirements.txt
    - pytest

build:
  stage: build
  script:
    - docker build -t ecodesign/backend .
    - docker push ecodesign/backend

deploy:
  stage: deploy
  script:
    - kubectl apply -f k8s/
\`\`\`

## Security Guidelines

### API Security
- Use JWT for authentication
- Implement rate limiting
- Enable CORS with specific origins
- Use HTTPS for all endpoints
- Implement input validation

### Data Security
- Encrypt sensitive data at rest
- Use parameterized queries
- Implement access control
- Regular security audits
- Maintain security logs

## Contributing Guidelines

### Code Style
- Follow PEP 8 for Python code
- Use ESLint for JavaScript/TypeScript
- Write meaningful commit messages
- Document all public functions
- Maintain test coverage above 80%

### Pull Request Process
1. Create feature branch
2. Write/update tests
3. Update documentation
4. Submit PR with description
5. Wait for code review
6. Address feedback
7. Merge after approval

### Version Control
\`\`\`bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Bug fixes
git checkout -b fix/bug-description
git commit -m "fix: resolve bug"
git push origin fix/bug-description
\`\`\`

