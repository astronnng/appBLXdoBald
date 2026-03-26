# Python 3.11 Slim as base
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Prevent Python from writing .pyc files and enable buffered logging
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies (build-essential needed for argon2 if pre-built wheels fail)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "8000"]
