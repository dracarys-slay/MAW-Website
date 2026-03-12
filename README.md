># MAW Robotics Website - Complete Setup & Usage Guide

## 📋 Project Overview

This is a comprehensive, professional website for **MAW Future Tech (MAW Robotics)**, a company specializing in advanced robotics solutions with presence in Kathmandu, Nepal.

**Company Information:**
- **Name:** MAW Future Tech / MAW Robotics
- **Tagline:** "Bridging Excellence Between Robot and Human Innovation"
- **Head Office:** Kathmandu, Nepal
- **Official Website:** www.mawvriddhifuturetech.com

---

## 🤖 Products Included

1. **UNITREE G1 Air** - Advanced Humanoid Robot
2. **UNITREE G1 EDU** - Educational Humanoid Robot
3. **UNITREE Go2 PRO** - Professional Quadruped Robot
4. **UNITREE Go2 X** - Extended Capability Quadruped

---

## 📁 Project Structure

```
MAW_Robotics_Website/
├── index.html                 # Homepage with cover page
├── products.html              # Robot products & specifications
├── lease.html                 # Robot leasing section
├── buy.html                   # Purchase/booking system
├── inquiry.html               # Customer inquiry form
├── servicing.html             # Robot servicing section
├── complaint.html             # Complaint form
├── feedback.html              # Feedback section
├── css/
│   ├── style.css             # Main styling
│   └── responsive.css        # Mobile responsive styles
├── js/
│   └── main.js               # JavaScript functionality
├── data/                      # Specification documents
├── images/                    # Robot images
└── admin/
    ├── admin.html             # Admin login page
    └── dashboard.html         # Admin management dashboard
```

---

## 🚀 Features Implemented

### 1. **Homepage (index.html)**
- Attractive hero section with company branding
- Company profile and slogan
- Core divisions overview (Industrial, Service, Healthcare, Education)
- Industries served section
- Why Choose Us features
- Revenue model display
- Product preview
- Quick access services
- Final CTA section

### 2. **Products Page (products.html)**
- Complete product listings for all 4 robots
- Detailed specifications
- Key features for each robot
- Applications information
- Product comparison table
- Space for upcoming robots
- Download datasheets

### 3. **Lease Management (lease.html)**
- Service packages (Monthly, Quarterly, Annual)
- Benefits of leasing
- Comprehensive lease request form
- Flexible pricing options

### 4. **Purchase System (buy.html)**
- Purchase benefits highlight
- Detailed order form
- Product selection with pricing
- Additional services (warranty, installation, training, integration)
- Delivery information
- Multiple payment methods
- Financing options
- FAQ section

### 5. **Customer Inquiry (inquiry.html)**
- Inquiry form with multiple categories
- Product interest selection
- Contact preference options
- Contact information display
- FAQ section

### 6. **Servicing Section (servicing.html)**
- Service scheduling form
- Multiple service types
- Service packages
- Maintenance benefits

### 7. **Complaint Management (complaint.html)**
- Complaint form with detailed fields
- Product information capture
- Complaint categorization
- Desired resolution options
- Customer location tracking

### 8. **Feedback System (feedback.html)**
- Comprehensive feedback form
- Star rating system
- Recommendation question
- Testimonials section

### 9. **Admin Panel**
- **Login Page (admin/admin.html)**
  - Secure authentication
  - Default credentials provided
  - Session-based access control
  
- **Dashboard (admin/dashboard.html)**
  - View all submissions
  - Separate sections for each form type:
    - Lease requests
    - Purchase orders
    - Customer inquiries
    - Service requests
    - Complaints
    - Feedback
  - Statistics overview
  - Search functionality
  - Export to CSV
  - View/Delete individual submissions
  - Settings section

---

## 🔐 Admin Credentials

To access the admin panel, use the credentials configured in your Supabase project.

⚠️ **Security Note:** Admin credentials must never be committed to the repository. Set them up via Supabase Auth dashboard.

---

## 💻 How to Use

### 1. **Opening the Website**
- Open `index.html` in your web browser
- The website will open with full navigation

### 2. **Navigation Options**
- **Home** - Returns to homepage
- **Solutions** - Scrolls to core divisions
- **Products** - View all robots and specifications
- **Lease** - Access robot leasing options
- **Buy** - Purchase robots
- **Inquiry** - Ask questions
- **Servicing** - Schedule maintenance
- **Support** - File complaints
- **Feedback** - Share feedback
- **Admin** - Access admin panel (password protected)

### 3. **Submitting Forms**
- All forms are stored in browser's localStorage
- Submissions are automatically saved and can be viewed in admin panel
- Form data persists even after closing browser

### 4. **Admin Panel Access**
1. Click "Admin" link in navigation
2. Enter your admin credentials (configured in Supabase Auth)
3. View all submissions in organized categories
4. Search, filter, and export data

---

## 📊 Data Storage

All form submissions are stored in the browser's **localStorage**:

- `leaseForm` - Lease requests
- `buyForm` - Purchase orders
- `inquiryForm` - Customer inquiries
- `servicingForm` - Service requests
- `complaintForm` - Complaints
- `feedbackForm` - Feedback

To access data via browser console:
```javascript
// View all lease requests
JSON.parse(localStorage.getItem('leaseForm'))

// View all purchases
JSON.parse(localStorage.getItem('buyForm'))

// Clear all data (use with caution!)
localStorage.clear()
```

---

## 🎨 Design Features

- **Color Scheme:**
  - Primary Blue: #0066ff
  - Secondary Cyan: #00d4ff
  - Dark Background: #0a0e27
  - Accent Red: #ff6b6b
  - Success Green: #51cf66

- **Responsive Design:** Works on mobile, tablet, and desktop
- **Smooth Animations:** Professional transitions and hover effects
- **Accessibility:** Proper labels, alt text, and semantic HTML
- **Performance Optimized:** Lightweight, fast-loading pages

---

## 📱 Mobile Responsive

The website is fully responsive with:
- Mobile hamburger menu
- Touch-friendly buttons
- Optimized layouts for all screen sizes
- Readable typography on all devices

---

## ⚡ Core Sections & Content

### Industrial Automation
- Robotic arms
- CNC automation
- Packaging automation
- Factory integration systems

### Service Robotics
- Hotel delivery robots
- Restaurant serving robots
- Mall guidance robots
- Airport assistance robots

### Healthcare Robotics
- Disinfection robots
- Medicine delivery robots
- Telepresence systems

### Education & AI Robotics
- STEM robotics labs
- AI training kits
- Robotics curriculum integration

### Industries Served
- Hospitality
- Healthcare
- Manufacturing
- Airports
- Government
- Education

---

## 🔧 Technical Details

- **HTML5** - Semantic structure
- **CSS3** - Advanced styling with gradients, animations
- **Vanilla JavaScript** - No frameworks required
- **LocalStorage** - Client-side data persistence
- **Responsive Design** - Mobile-first approach

---

## 📝 Forms Included

1. **Lease Form** - Robot leasing requests
2. **Buy Form** - Purchase orders with options
3. **Inquiry Form** - Customer questions
4. **Servicing Form** - Maintenance scheduling
5. **Complaint Form** - Issue reporting
6. **Feedback Form** - Customer feedback

Each form includes:
- Validation
- Multiple field types (text, email, select, textarea, date, etc.)
- Timestamp recording
- Automatic localStorage saving

---

## 🎯 Future Enhancements

The website includes space for:
- Upcoming robot models
- Future service expansions
- Additional features
- Enhanced admin capabilities

---

## 📞 Contact Information

- **Email:** info@mawrobotics.com
- **Phone:** +977-1-XXXX-XXXX
- **Location:** Kathmandu, Nepal
- **Website:** www.mawvriddhifuturetech.com

---

## 📄 License & Notes

This website template is created for MAW Robotics/MAW Future Tech. All content, product names, and specifications should be updated with actual company details.

---

## ✨ Key Features Summary

✅ Complete company profile  
✅ 4 detailed robot product pages  
✅ Leasing system with flexible plans  
✅ Purchase/booking system  
✅ Customer inquiry management  
✅ Servicing/maintenance scheduling  
✅ Complaint tracking system  
✅ Feedback collection  
✅ Secure admin dashboard  
✅ Data export capabilities  
✅ Mobile responsive design  
✅ Professional animations  
✅ LocalStorage data persistence  
✅ Search & filter functionality  

---

**Thank you for using MAW Robotics Website!**  
*Engineering Nepal's Intelligent Future*
