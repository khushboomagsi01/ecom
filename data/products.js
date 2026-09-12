export const seedProducts = [
  // --- Original 12 ---
  { name: 'Wireless Headphones Pro', description: 'Noise-cancelling over-ear headphones with 30hr battery', price: 299.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/headphones/400/300', stock: 45 },
  { name: 'Mechanical Keyboard RGB', description: 'Cherry MX Blue switches, per-key RGB lighting', price: 149.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/keyboard/400/300', stock: 32 },
  { name: 'Ultrawide Monitor 34"', description: '3440x1440, 144Hz, HDR400, USB-C hub', price: 599.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/monitor/400/300', stock: 18 },
  { name: 'Ergonomic Office Chair', description: 'Mesh back, lumbar support, 4D armrests', price: 429.99, category: 'Furniture', image_url: 'https://picsum.photos/seed/chair/400/300', stock: 12 },
  { name: 'Standing Desk Electric', description: 'Dual motor, memory presets, 60" width', price: 649.99, category: 'Furniture', image_url: 'https://picsum.photos/seed/desk/400/300', stock: 8 },
  { name: 'Webcam 4K Pro', description: 'Auto-focus, HDR, privacy cover, 90° FOV', price: 199.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/webcam/400/300', stock: 56 },
  { name: 'USB-C Hub 7-in-1', description: 'HDMI 4K, USB-A 3.0, SD, PD 100W pass-through', price: 79.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/hub/400/300', stock: 78 },
  { name: 'Wireless Mouse Ergonomic', description: 'Vertical design, 6 programmable buttons, 70-day battery', price: 59.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/mouse/400/300', stock: 64 },
  { name: 'Monitor Light Bar', description: 'Asymmetric lighting, auto-dim, touch control', price: 89.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/lightbar/400/300', stock: 41 },
  { name: 'Laptop Stand Aluminum', description: 'Adjustable height, cable management, fits 17"', price: 49.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/stand/400/300', stock: 53 },
  { name: 'Gaming Chair Racing', description: 'Recline 180°, 4D armrests, memory foam', price: 379.99, category: 'Furniture', image_url: 'https://picsum.photos/seed/gamingchair/400/300', stock: 15 },
  { name: 'Portable SSD 2TB', description: 'USB 3.2 Gen 2x2, 2000MB/s, IP55 rated', price: 249.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/ssd/400/300', stock: 27 },

  // --- Electronics (7 more) ---
  { name: 'Drone 4K Foldable', description: '3-axis gimbal, 34min flight time, obstacle avoidance', price: 499.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/drone4k/400/300', stock: 14 },
  { name: 'Action Camera 4K60', description: 'Waterproof 10m, HyperSmooth stabilization, 128GB support', price: 199.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/actioncam/400/300', stock: 38 },
  { name: 'Smart Home Hub', description: 'Zigbee, Matter, Thread support with voice assistant built-in', price: 129.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/smarthub/400/300', stock: 47 },
  { name: 'Power Bank 20000mAh', description: '65W PD fast charging, dual USB-C, airline safe', price: 39.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/powerbank/400/300', stock: 92 },
  { name: 'E-Reader 7-inch', description: '300ppi glare-free display, 6-week battery, waterproof', price: 139.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/ereader/400/300', stock: 29 },
  { name: 'Tablet 11-inch 128GB', description: '120Hz display, stylus support, 12hr battery', price: 349.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/tablet11/400/300', stock: 21 },
  { name: 'Mini PC Ryzen 7', description: '32GB RAM, 1TB NVMe, dual 4K HDMI, WiFi 6E', price: 549.99, category: 'Electronics', image_url: 'https://picsum.photos/seed/minipc/400/300', stock: 11 },

  // --- Accessories (8 more) ---
  { name: 'Wireless Charger Pad 15W', description: 'MagSafe compatible, temperature control, USB-C PD', price: 29.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/chargerpad/400/300', stock: 84 },
  { name: 'Laptop Sleeve 16-inch', description: 'Water-resistant neoprene with accessory pocket', price: 24.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/sleeve/400/300', stock: 97 },
  { name: 'Desk Mat XL RGB', description: 'Extended 900x400mm, stitched edges, 14 light modes', price: 34.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/deskmat/400/300', stock: 71 },
  { name: 'USB Microphone Studio', description: 'Cardioid condenser, tap-to-mute, zero-latency monitoring', price: 119.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/usbmicro/400/300', stock: 26 },
  { name: 'Phone Tripod Flexible', description: '360° ball head, Bluetooth remote, fits all phones', price: 19.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/tripod/400/300', stock: 110 },
  { name: 'Cable Organizer Box', description: 'Bamboo lid, surge protector slot, 3 compartments', price: 27.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/cablebox/400/300', stock: 66 },
  { name: 'Privacy Screen 15.6-inch', description: 'Magnetic attach, blue-light filter, anti-glare', price: 44.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/privacy/400/300', stock: 48 },
  { name: 'Portable Laptop Dock', description: '12-in-1, dual 4K HDMI, 2.5Gb Ethernet, 100W PD', price: 159.99, category: 'Accessories', image_url: 'https://picsum.photos/seed/laptopdock/400/300', stock: 19 },

  // --- Furniture (5 more) ---
  { name: 'Bookshelf 5-Tier', description: 'Solid bamboo, 150lb capacity, anti-tip kit included', price: 129.99, category: 'Furniture', image_url: 'https://picsum.photos/seed/bookshelf/400/300', stock: 22 },
  { name: 'Monitor Riser Wood', description: 'Walnut veneer, 2 storage drawers, fits dual monitors', price: 69.99, category: 'Furniture', image_url: 'https://picsum.photos/seed/riser/400/300', stock: 34 },
  { name: 'Foot Rest Ergonomic', description: 'Memory foam, adjustable tilt, washable cover', price: 39.99, category: 'Furniture', image_url: 'https://picsum.photos/seed/footrest/400/300', stock: 58 },
  { name: 'Filing Cabinet 3-Drawer', description: 'Lockable, full-extension slides, fits A4/Letter', price: 189.99, category: 'Furniture', image_url: 'https://picsum.photos/seed/filing/400/300', stock: 9 },
  { name: 'Acoustic Panels 12-Pack', description: 'High-density foam, NRC 0.85, beveled edges', price: 59.99, category: 'Furniture', image_url: 'https://picsum.photos/seed/acoustic/400/300', stock: 43 },

  // --- Audio (8) ---
  { name: 'Earbuds Pro ANC', description: 'Adaptive noise cancelling, wireless charging, 36hr case', price: 179.99, category: 'Audio', image_url: 'https://picsum.photos/seed/earbuds/400/300', stock: 61 },
  { name: 'Bluetooth Speaker Boom', description: '360° sound, IPX7 waterproof, 24hr playtime', price: 89.99, category: 'Audio', image_url: 'https://picsum.photos/seed/speaker/400/300', stock: 52 },
  { name: 'Soundbar Dolby Atmos', description: '5.1.2 channels, wireless subwoofer, HDMI eARC', price: 399.99, category: 'Audio', image_url: 'https://picsum.photos/seed/soundbar/400/300', stock: 16 },
  { name: 'Studio Headphones Flat', description: 'Reference tuning, detachable cable, foldable', price: 159.99, category: 'Audio', image_url: 'https://picsum.photos/seed/studiohp/400/300', stock: 33 },
  { name: 'Vinyl Turntable Belt', description: 'Built-in preamp, Bluetooth out, walnut plinth', price: 249.99, category: 'Audio', image_url: 'https://picsum.photos/seed/turntable/400/300', stock: 7 },
  { name: 'DAC Headphone Amp', description: '32-bit/768kHz, balanced 4.4mm, MQA decoding', price: 199.99, category: 'Audio', image_url: 'https://picsum.photos/seed/dacamp/400/300', stock: 13 },
  { name: 'Karaoke Mic Wireless', description: 'Dual UHF mics, echo control, 30m range', price: 69.99, category: 'Audio', image_url: 'https://picsum.photos/seed/karaoke/400/300', stock: 44 },
  { name: 'Conference Speakerphone', description: '8-mic array, full-duplex, Teams/Zoom certified', price: 149.99, category: 'Audio', image_url: 'https://picsum.photos/seed/confphone/400/300', stock: 25 },

  // --- Gaming (8) ---
  { name: 'Gaming Mouse 26K DPI', description: '58g ultralight, 8K polling, optical switches', price: 99.99, category: 'Gaming', image_url: 'https://picsum.photos/seed/gmouse/400/300', stock: 49 },
  { name: 'Gaming Keyboard TKL', description: 'Hot-swap linear switches, PBT keycaps, 8000Hz polling', price: 129.99, category: 'Gaming', image_url: 'https://picsum.photos/seed/gkeyboard/400/300', stock: 37 },
  { name: 'Gaming Headset 7.1', description: '50mm drivers, detachable mic, memory-foam earcups', price: 89.99, category: 'Gaming', image_url: 'https://picsum.photos/seed/gheadset/400/300', stock: 54 },
  { name: 'Gaming Monitor 27in 240Hz', description: '1440p Fast IPS, 0.5ms, HDR600, G-Sync compatible', price: 449.99, category: 'Gaming', image_url: 'https://picsum.photos/seed/gmonitor/400/300', stock: 10 },
  { name: 'Pro Controller Hall-Effect', description: 'Anti-drift sticks, 4 back paddles, 1000Hz wired', price: 79.99, category: 'Gaming', image_url: 'https://picsum.photos/seed/controller/400/300', stock: 68 },
  { name: 'Racing Wheel Force', description: 'Direct-drive 8Nm, load-cell pedals, 900° rotation', price: 349.99, category: 'Gaming', image_url: 'https://picsum.photos/seed/racingwheel/400/300', stock: 6 },
  { name: 'Capture Card 4K60', description: 'HDR passthrough, VRR support, OBS certified', price: 179.99, category: 'Gaming', image_url: 'https://picsum.photos/seed/capture/400/300', stock: 17 },
  { name: 'Gaming Desk L-Shaped', description: 'Carbon-fiber texture, cable tray, monitor shelf', price: 229.99, category: 'Gaming', image_url: 'https://picsum.photos/seed/gdesk/400/300', stock: 12 },
];
