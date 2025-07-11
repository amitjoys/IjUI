#!/usr/bin/env python3
import requests
import sys
import subprocess

def check_supervisor_status():
    """Check supervisor service status"""
    try:
        result = subprocess.run(['sudo', 'supervisorctl', 'status'], 
                              capture_output=True, text=True, check=True)
        print("📊 Supervisor Status:")
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to check supervisor status: {e}")
        return False

def test_frontend_availability():
    """Test if the frontend application is available"""
    try:
        response = requests.get("http://localhost:3000", timeout=10)
        if response.status_code == 200:
            print("✅ Frontend is accessible at http://localhost:3000")
            return True
        else:
            print(f"❌ Frontend returned status code {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to frontend: {str(e)}")
        return False

def test_mongodb_status():
    """Test if MongoDB is running"""
    try:
        result = subprocess.run(['sudo', 'supervisorctl', 'status', 'mongodb'], 
                              capture_output=True, text=True, check=True)
        if 'RUNNING' in result.stdout:
            print("✅ MongoDB is running")
            return True
        else:
            print("❌ MongoDB is not running")
            return False
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to check MongoDB status: {e}")
        return False

def main():
    print("InfoJoy Lead Generation Platform - Backend Test Suite")
    print("=" * 60)
    print("Testing infrastructure and service availability...")
    print("=" * 60)
    
    # Check supervisor status
    supervisor_ok = check_supervisor_status()
    
    # Test MongoDB
    mongodb_ok = test_mongodb_status()
    
    # Test frontend availability
    frontend_available = test_frontend_availability()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 Test Summary:")
    print("=" * 60)
    
    if supervisor_ok:
        print("✅ Supervisor services checked")
    else:
        print("❌ Supervisor services check failed")
        
    if mongodb_ok:
        print("✅ MongoDB is running")
    else:
        print("❌ MongoDB is not running")
        
    if frontend_available:
        print("✅ Frontend is accessible")
    else:
        print("❌ Frontend is not accessible")
    
    print("\n📝 Notes:")
    print("• This is a frontend-focused application")
    print("• Backend service is not started (expected for this setup)")
    print("• MongoDB is available for potential future backend integration")
    print("• Frontend testing will be performed via browser automation")
    
    # Return success if frontend is available (main requirement)
    return 0 if frontend_available else 1

if __name__ == "__main__":
    sys.exit(main())