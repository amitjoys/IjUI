#!/usr/bin/env python3
import requests
import sys

def test_frontend_availability():
    """Test if the frontend application is available"""
    try:
        response = requests.get("http://localhost:3000")
        if response.status_code == 200:
            print("✅ Frontend is accessible at http://localhost:3000")
            return True
        else:
            print(f"❌ Frontend returned status code {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to frontend: {str(e)}")
        return False

def main():
    print("InfoJoy Lead Generation Platform - Test Suite")
    print("=" * 50)
    print("NOTE: This application appears to be frontend-only with no actual backend API.")
    print("      The tests will focus on frontend availability only.")
    print("=" * 50)
    
    # Test frontend availability
    frontend_available = test_frontend_availability()
    
    # Summary
    print("\nTest Summary:")
    if frontend_available:
        print("✅ Frontend is accessible")
        print("⚠️ No backend API found to test")
        return 0
    else:
        print("❌ Frontend is not accessible")
        return 1

if __name__ == "__main__":
    sys.exit(main())