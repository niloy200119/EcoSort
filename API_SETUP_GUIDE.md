# API Setup Guide for EcoSort

This guide will help you configure all external API integrations for the EcoSort platform.

## Required APIs

### 1. Google Gemini AI (Chatbot)
**Purpose:** Powers the AI chatbot for waste management assistance

**Setup:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Add to `.env.development`:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

**Free Tier:** 60 requests per minute

---

### 2. Google Maps API (Map Display)
**Purpose:** Display interactive maps with recycling centers

**Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Restrict the key (recommended):
   - Application restrictions: HTTP referrers
   - API restrictions: Select the enabled APIs
6. Add to `.env.development`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

**Free Tier:** $200 credit per month

---

### 3. OpenCage Geocoding API (Address Lookup)
**Purpose:** Convert coordinates to addresses and vice versa

**Setup:**
1. Go to [OpenCage](https://opencagedata.com/)
2. Sign up for a free account
3. Get your API key from dashboard
4. Add to `.env.development`:
   ```
   VITE_OPENCAGE_API_KEY=your_actual_api_key_here
   ```

**Free Tier:** 2,500 requests/day

---

### 4. OpenWeather API (Weather Data)
**Purpose:** Show weather conditions affecting waste collection

**Setup:**
1. Go to [OpenWeather](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "API keys" tab
4. Copy the default key or create new
5. Add to `.env.development`:
   ```
   VITE_WEATHER_API_KEY=your_actual_api_key_here
   ```

**Free Tier:** 1,000 requests/day

---

## Environment Setup

### Development (.env.development)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_OPENCAGE_API_KEY=your_opencage_geocoding_api_key_here
VITE_WEATHER_API_KEY=your_openweather_api_key_here
```

### Production (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-url.com
VITE_GEMINI_API_KEY=your_production_gemini_api_key
VITE_GOOGLE_MAPS_API_KEY=your_production_google_maps_api_key
VITE_OPENCAGE_API_KEY=your_production_opencage_api_key
VITE_WEATHER_API_KEY=your_production_openweather_api_key
```

---

## Features Using Each API

### Gemini AI Chatbot
- **Location:** Bottom-left corner (green pulsing bot icon)
- **Features:**
  - Waste identification
  - Recycling guidance
  - E-waste disposal help
  - Composting tips
  - Environmental impact info

### Live Waste Map
- **Route:** `/live-map`
- **Features:**
  - Real-time vehicle tracking
  - Recycling center locations
  - User location detection
  - Distance calculation
  - Route planning

### Geocoding
- **Used In:** 
  - User location display
  - Reverse geocoding (lat/lng → address)
  - Search for locations

### Weather Integration
- **Future Use:**
  - Collection schedule weather alerts
  - Outdoor activity recommendations
  - Composting weather tips

---

## Testing API Integration

Run the application and check:

1. **AI Chatbot:** 
   - Click the bot icon in bottom-left
   - Ask a question about recycling
   - Should get AI-powered response

2. **Live Map:**
   - Navigate to `/live-map`
   - Click "My Location" button
   - Should see map with markers

3. **API Status:**
   - Check the Live Map sidebar
   - Green dots = API configured ✅
   - Red dots = API not configured ❌

---

## Security Best Practices

### API Key Protection
1. ✅ Never commit API keys to Git
2. ✅ Use environment variables
3. ✅ Add `.env*` to `.gitignore`
4. ✅ Restrict API keys in provider dashboards
5. ✅ Use different keys for dev/production

### API Key Restrictions

**Google Maps API:**
- Application restrictions: HTTP referrers
- Website restrictions: `localhost:*`, `your-domain.com/*`
- API restrictions: Only enable needed APIs

**Gemini AI:**
- No special restrictions needed for development
- Consider IP restrictions for production

---

## Cost Management

### Free Tier Limits
| API | Free Tier | Overage Cost |
|-----|-----------|--------------|
| Gemini AI | 60 req/min | Free (currently) |
| Google Maps | $200/month credit | Pay-as-you-go |
| OpenCage | 2,500 req/day | $50/month for 10k/day |
| OpenWeather | 1,000 req/day | $40/month for 100k/day |

### Tips to Stay in Free Tier
1. Cache API responses
2. Implement request throttling
3. Use local storage for repeated data
4. Lazy load maps (only when needed)
5. Debounce search requests

---

## Troubleshooting

### "API Key Not Configured" Error
- Check `.env` file exists in `client/` folder
- Verify variable names start with `VITE_`
- Restart dev server after changing `.env`

### Map Not Loading
- Check browser console for errors
- Verify Google Maps API is enabled
- Check API key restrictions
- Ensure billing is enabled (even for free tier)

### Gemini AI Not Responding
- Verify API key is valid
- Check console for error messages
- Ensure you're within rate limits
- Try regenerating the API key

### Geocoding Errors
- Check OpenCage API key is active
- Verify request format
- Check daily quota usage

---

## Additional Resources

- [Google AI Studio](https://makersuite.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OpenCage Documentation](https://opencagedata.com/api)
- [OpenWeather Documentation](https://openweathermap.org/api)
- [React Leaflet Docs](https://react-leaflet.js.org/)

---

## Support

If you encounter issues:
1. Check console logs
2. Verify API key configuration
3. Test API keys directly in provider dashboards
4. Check API usage quotas
5. Review error messages for specific guidance
