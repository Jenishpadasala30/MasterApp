-- N5ARPITA Luxury Cosmetics Sample Data

-- Insert Categories
INSERT INTO categories (name, slug, description, image_url, active, display_order, created_at) VALUES
('Skin Care', 'skin-care', 'Premium skin care essentials for radiant, healthy skin', NULL, true, 1, NOW()),
('Hair Care', 'hair-care', 'Luxury hair care products for lustrous, beautiful hair', NULL, true, 2, NOW()),
('Perfumes', 'perfumes', 'Signature fragrances that define elegance', NULL, true, 3, NOW()),
('Makeup', 'makeup', 'Professional makeup for flawless beauty', NULL, true, 4, NOW()),
('Gift Sets', 'gift-sets', 'Curated luxury gift collections', NULL, true, 5, NOW());

-- Insert Products (Skin Care)
INSERT INTO products (name, slug, description, short_description, price, mrp, sku, ingredients, `usage`, benefits, size, category_id, active, featured, stock_quantity, average_rating, review_count, created_at, updated_at) VALUES
('24K Gold Radiance Serum', '24k-gold-radiance-serum', 
'Infused with pure 24-karat gold particles, this luxurious serum transforms your skincare routine. Gold has been revered for centuries for its anti-aging properties, helping to reduce fine lines and wrinkles while boosting skin elasticity. The lightweight formula absorbs quickly, leaving skin luminous and rejuvenated.',
'Luxury anti-aging serum with 24K gold particles',
2999.00, 3999.00, 'N5A-SKIN-001',
'24K Gold, Hyaluronic Acid, Vitamin E, Rose Essential Oil, Peptide Complex',
'Apply 2-3 drops to cleansed face and neck. Gently massage in upward circular motions. Use morning and evening for best results.',
'Reduces fine lines, Boosts elasticity, Enhances radiance, Deep hydration',
'30ml', 1, true, true, 50, 0, 0, NOW(), NOW()),

('Diamond Dust Face Cream', 'diamond-dust-face-cream',
'Experience pure luxury with our Diamond Dust Face Cream. Real diamond particles reflect light for an instant glow while powerful antioxidants protect and nourish your skin. This rich, yet non-greasy formula provides 24-hour hydration.',
'Illuminating face cream with diamond particles',
3499.00, 4999.00, 'N5A-SKIN-002',
'Diamond Powder, Shea Butter, Collagen, Vitamin C, Jojoba Oil',
'Apply a small amount to cleansed face and neck. Massage gently until fully absorbed. Use daily.',
'Instant glow, Deep moisture, Anti-aging, Skin brightening',
'50ml', 1, true, true, 35, 0, 0, NOW(), NOW()),

('Pearl Extract Night Cream', 'pearl-extract-night-cream',
'Let your skin repair and renew overnight with our Pearl Extract Night Cream. Enriched with genuine pearl powder and marine collagen, this luxurious cream works while you sleep to reveal softer, smoother, more youthful-looking skin.',
'Overnight renewal cream with pearl extract',
2499.00, 3299.00, 'N5A-SKIN-003',
'Pearl Powder, Marine Collagen, Niacinamide, Retinol, Aloe Vera',
'Apply generously to face and neck before bed. Allow to absorb fully. Use nightly.',
'Overnight renewal, Reduces dark spots, Firms skin, Deep nourishment',
'50ml', 1, true, false, 40, 0, 0, NOW(), NOW()),

('Rose Quartz Facial Serum', 'rose-quartz-facial-serum',
'Harness the healing power of rose quartz crystal with this gentle yet effective serum. Known for promoting love and healing, rose quartz combined with botanical extracts creates the perfect balance for sensitive skin.',
'Crystal-infused serum for sensitive skin',
2199.00, 2999.00, 'N5A-SKIN-004',
'Rose Quartz Extract, Chamomile, Calendula, Vitamin B5, Green Tea',
'Apply 2-3 drops after cleansing. Pat gently into skin. Use twice daily.',
'Soothes sensitivity, Reduces redness, Calms irritation, Hydrates',
'30ml', 1, true, false, 45, 0, 0, NOW(), NOW());

-- Insert Products (Hair Care)
INSERT INTO products (name, slug, description, short_description, price, mrp, sku, ingredients, `usage`, benefits, size, category_id, active, featured, stock_quantity, average_rating, review_count, created_at, updated_at) VALUES
('Argan Oil Hair Elixir', 'argan-oil-hair-elixir',
'Pure liquid gold for your hair. Our Argan Oil Hair Elixir is sourced from Morocco and enriched with vitamins and fatty acids. Transform dry, damaged hair into silky, lustrous locks with just a few drops.',
'Moroccan argan oil for silky hair',
1899.00, 2499.00, 'N5A-HAIR-001',
'Argan Oil, Vitamin E, Omega Fatty Acids, Keratin, Silk Protein',
'Apply 2-3 drops to damp or dry hair. Focus on mid-lengths and ends. Style as usual.',
'Deep nourishment, Adds shine, Repairs damage, Tames frizz',
'100ml', 2, true, true, 60, 0, 0, NOW(), NOW()),

('Caviar Protein Hair Mask', 'caviar-protein-hair-mask',
'Indulge your hair with the rarest ingredients. Caviar extract and protein complex work together to rebuild and strengthen hair from within. Experience salon-quality results at home.',
'Intensive repair mask with caviar extract',
2699.00, 3499.00, 'N5A-HAIR-002',
'Caviar Extract, Hydrolyzed Protein, Biotin, Panthenol, Coconut Oil',
'Apply to wet hair after shampooing. Leave for 10-15 minutes. Rinse thoroughly. Use weekly.',
'Intense repair, Strengthens hair, Adds volume, Deep conditioning',
'200ml', 2, true, false, 30, 0, 0, NOW(), NOW());

-- Insert Products (Perfumes)
INSERT INTO products (name, slug, description, short_description, price, mrp, sku, ingredients, `usage`, benefits, size, category_id, active, featured, stock_quantity, average_rating, review_count, created_at, updated_at) VALUES
('N5ARPITA Signature Noir', 'n5arpita-signature-noir',
'Our flagship fragrance. A bold, sophisticated blend that embodies luxury and elegance. Top notes of bergamot and pink pepper give way to a heart of jasmine and rose, finished with warm amber and vanilla base notes.',
'Signature luxury fragrance for women',
4999.00, 6999.00, 'N5A-PERF-001',
'Bergamot, Pink Pepper, Jasmine, Rose, Amber, Vanilla, Musk',
'Spray on pulse points - wrists, neck, behind ears. Avoid rubbing.',
'Long-lasting scent, Sophisticated aroma, All-day freshness',
'50ml EDP', 3, true, true, 25, 0, 0, NOW(), NOW()),

('Golden Hour Eau de Parfum', 'golden-hour-eau-de-parfum',
'Capture the magic of golden hour with this radiant fragrance. Citrus top notes blend with floral heart and woody base for a scent that is both fresh and warm.',
'Radiant citrus-floral fragrance',
3999.00, 5499.00, 'N5A-PERF-002',
'Mandarin, Neroli, Peony, Sandalwood, White Musk',
'Spray generously on skin and clothing. Reapply as desired.',
'Uplifting scent, Elegant aroma, Versatile fragrance',
'50ml EDP', 3, true, true, 20, 0, 0, NOW(), NOW());

-- Insert Products (Makeup)
INSERT INTO products (name, slug, description, short_description, price, mrp, sku, ingredients, `usage`, benefits, size, category_id, active, featured, stock_quantity, average_rating, review_count, created_at, updated_at) VALUES
('Velvet Matte Lipstick - Rouge', 'velvet-matte-lipstick-rouge',
'Experience luxury on your lips. Our velvet matte formula glides on smoothly and sets to a long-lasting, comfortable matte finish. Enriched with vitamin E and shea butter to keep lips soft.',
'Long-lasting velvet matte lipstick',
1299.00, 1799.00, 'N5A-MAKE-001',
'Vitamin E, Shea Butter, Jojoba Oil, Natural Pigments',
'Apply directly to clean, dry lips. Build up for more intensity.',
'Long-lasting color, Comfortable wear, Non-drying, Rich pigment',
'3.5g', 4, true, false, 100, 0, 0, NOW(), NOW()),

('Luxury Pressed Powder Foundation', 'luxury-pressed-powder-foundation',
'Flawless coverage in a compact. This finely milled powder foundation provides buildable coverage while controlling shine. Perfect for touch-ups throughout the day.',
'Buildable powder foundation with SPF',
1899.00, 2499.00, 'N5A-MAKE-002',
'Mica, Titanium Dioxide, Hyaluronic Acid, Vitamin E, SPF 15',
'Apply with brush or sponge. Build coverage as needed. Can be used alone or over liquid foundation.',
'Natural finish, Controls oil, Buildable coverage, With SPF',
'12g', 4, true, false, 75, 0, 0, NOW(), NOW());

-- Insert Products (Gift Sets)
INSERT INTO products (name, slug, description, short_description, price, mrp, sku, ingredients, `usage`, benefits, size, category_id, active, featured, stock_quantity, average_rating, review_count, created_at, updated_at) VALUES
('Radiance Ritual Gift Box', 'radiance-ritual-gift-box',
'The perfect gift of luxury. This beautifully packaged set includes our 24K Gold Serum, Diamond Face Cream, and Rose Quartz Serum. Everything needed for a complete radiance ritual.',
'Complete luxury skincare gift set',
7999.00, 10999.00, 'N5A-GIFT-001',
'See individual products for complete ingredient lists',
'Follow the complete routine: Serum, then Cream, finishing with Rose Quartz Serum.',
'Complete routine, Perfect gift, Premium packaging, Great value',
'Gift Set', 5, true, true, 15, 0, 0, NOW(), NOW()),

('Golden Goddess Collection', 'golden-goddess-collection',
'Feel like a goddess with this luxurious collection. Includes our Signature Noir perfume, Gold Serum, and Golden Hour lipstick. Presented in an elegant gold gift box.',
'Premium beauty gift collection',
8999.00, 11999.00, 'N5A-GIFT-002',
'See individual products for complete ingredient lists',
'Use products as per individual instructions. Perfect for daily luxury.',
'Complete beauty kit, Luxury packaging, Premium selection',
'Gift Set', 5, true, true, 10, 0, 0, NOW(), NOW());
