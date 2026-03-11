# MAW Robotics Website - Network Access Guide

## Server Status: RUNNING ✓

Your website is now accessible to everyone on your network!

---

## Access URLs

### From Your Computer (Local):
- `http://localhost:8080`
- `http://127.0.0.1:8080`

### From Other Computers on Your Network:
- **`http://192.168.1.75:8080`** ← Share this link!

---

## How to Share with Others

### On Same WiFi Network:
1. Share the link: `http://192.168.1.75:8080`
2. They can open it in any web browser on the same network

### Instructions for Others:
1. Open a web browser (Chrome, Firefox, Edge, Safari, etc.)
2. Type or paste: `http://192.168.1.75:8080`
3. Press Enter
4. The MAW Robotics website will load!

---

## Features Available:
- ✓ Browse all 4 robot products (G1 Air, G1 EDU, Go2 PRO, Go2 X)
- ✓ Submit lease requests
- ✓ Submit purchase orders
- ✓ Submit inquiries
- ✓ Schedule servicing
- ✓ File complaints
- ✓ Submit feedback
- ✓ Admin dashboard (email: admin@mawrobotics.com, password: MAWadmin@2026)

---

## Important Notes:

### If Others Can't Access:
1. Make sure they're on the **same WiFi network** as your computer
2. Check your Windows Firewall settings (may need to allow port 8080)
3. Your computer must stay powered on

### To Stop the Server:
- Close the PowerShell/Terminal window running the server, or
- Press `CTRL+C` in the terminal window

### To Restart the Server:
```powershell
cd c:\Users\prasi\MAW_Robotics_Website
python server.py
```

---

## Firewall Configuration (If Needed):

If others can't access the website, you may need to allow port 8080 through Windows Firewall:

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Click "Change settings"
4. Click "Allow another app..."
5. Browse to: `C:\Users\prasi\AppData\Local\Programs\Python\Python312\python.exe`
6. Click "Add"
7. Make sure it's checked for "Private" networks
8. Click OK

---

## Server Details:
- **Port**: 8080
- **Host IP**: 192.168.1.75
- **Website Directory**: c:\Users\prasi\MAW_Robotics_Website\
- **Server Script**: server.py

---

**Website now accessible to everyone!** 🎉
