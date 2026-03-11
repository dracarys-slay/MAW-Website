# MAW Robotics Website - Troubleshooting Guide

## Problem: "Takes too long to open" or "Cannot reach site"

### Solution 1: Allow Port 8080 Through Firewall (RECOMMENDED)

**Step 1: Run firewall-allow.bat as Administrator**
1. Right-click on `firewall-allow.bat` in the website folder
2. Select "Run as Administrator"
3. Click "Yes" when prompted
4. You should see "SUCCESS!" message
5. Try accessing the website again from another computer

After running this, try accessing: `http://192.168.1.75:8080`

---

### Solution 2: Temporarily Disable Windows Firewall (FOR TESTING ONLY)

**⚠️ WARNING: Only do this temporarily for testing!**

1. Press `Win + R`
2. Type: `wf.msc`
3. Press Enter (Windows Defender Firewall opens)
4. Click "Turn Windows Defender Firewall on or off" (left side)
5. Select "Turn off Windows Defender Firewall" for both Private and Public
6. Click OK

**Test the website:** Try accessing from another computer

**Don't forget to turn it back on!**
1. Repeat steps 1-4 above
2. Select "Turn on Windows Defender Firewall" for both
3. Click OK

---

### Solution 3: Check Network Connectivity

**From another computer, try testing connection:**

1. Open Command Prompt (press `Win + R`, type `cmd`, press Enter)
2. Run this command:
   ```
   ping 192.168.1.75
   ```
3. If you see replies, the network is working
4. If you get "Destination host unreachable" or timeout, the computer is not reachable

---

### Solution 4: Verify Server is Running

**On your computer (the one hosting the website):**

1. Open Command Prompt
2. Run: `netstat -ano | findstr "8080"`
3. If you see a line with "LISTENING", the server is running ✓
4. If nothing appears, the server has stopped - restart it

---

### Solution 5: Check IP Address

Your IP address is: **192.168.1.75**

**To confirm it hasn't changed:**
1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" - should show `192.168.1.75`
4. If different, use the new IP address to access the website

---

### Solution 6: Restart Everything

1. **Stop the current server:**
   - Find the PowerShell window running the server
   - Press `CTRL+C`
   
2. **Restart the server:**
   - Double-click `start-server.bat` in the website folder
   
3. **Wait 10 seconds** for the server to fully start
   
4. **Try accessing from another computer** again

---

### Solution 7: Use HTTP Instead of HTTPS

Some antivirus or network filters block HTTPS connections on unusual ports.

**Make sure you're using:**
- ✓ `http://192.168.1.75:8080` (HTTP, not HTTPS)
- ✗ NOT `https://192.168.1.75:8080`

---

## Step-by-Step Quick Fix

1. **On your computer:**
   - Right-click `firewall-allow.bat`
   - Select "Run as Administrator"
   - Click Yes on the UAC prompt
   - Verify "SUCCESS!" message appears

2. **Close all web browsers** on the other computer

3. **Open a fresh browser window** and try:
   - `http://192.168.1.75:8080`

4. **Wait 10-15 seconds** (first connection can be slow)

5. **If still not working:**
   - Check if your computer is on the **same WiFi network**
   - Check if you can `ping 192.168.1.75` from the other computer
   - Try restarting both computers

---

## Advanced Troubleshooting

### Check Firewall Rules Directly

1. Press `Win + R`
2. Type: `wf.msc`
3. Click "Inbound Rules" on the left
4. Look for "MAW Robotics Website"
5. If found and says "Enabled", it's working
6. If not found, run `firewall-allow.bat` again as Administrator

### Check Server Logs

If the server is running, you should see connection logs in the PowerShell window:
```
[date/time] GET / HTTP/1.1" 200 -
```

This means a request was successfully served.

---

## Still Not Working?

**Provide the following information:**

1. From the other computer, run in Command Prompt:
   ```
   ipconfig /all
   ```
   Copy the results

2. From your computer (the server), take a screenshot of:
   - The PowerShell window showing the server
   - The "netstat -ano | findstr 8080" output

3. Check your router's configuration to ensure:
   - Both computers are on the same network
   - No port blocking is enabled

---

## Alternative Solution: Use ngrok (Cloud Tunnel)

If network issues persist, you can use ngrok to expose your website to the internet:

1. Download ngrok from: `https://ngrok.com/download`
2. Extract and run: `ngrok http 8080`
3. Share the URL from ngrok (looks like: `https://xxx-yyy.ngrok.io`)
4. Anyone can access it from anywhere (internet or local network)

---

**Website Server Address:** 192.168.1.75:8080
**Status:** Running ✓
**Last Updated:** February 13, 2026
