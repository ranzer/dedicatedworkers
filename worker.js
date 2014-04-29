setPixel = function() {
	var index;
	
	index = (x + y * imageData.width) * 4;
	
	imageData.data[index + 0] = r;
	imageData.data[index + 1] = g;
	imageData.data[index + 2] = b;
	imageData.data[index + 3] = 255;
};

onmessage = function(event) {
	var b, d, g, height, imageData, pos, r, seed, t, width, x, x2, xoff, y, y2, yoff;
	pos = 0;
	
	imageData = event.data.pixels;
	seed = event.data.seed;
	width = imageData.width;
	height = imageData.height;
	
	xoff = width / 2;
	yoff = height / 2;
	
	y = 0;
	
	while (y < height) {
		x = 0;
		while (x < width) {
			x2 = x - xoff;
			y2 = y - yoff;
			d = Math.sqrt(x2 * x2 + y2 * y2);
			t = Math.sin(d / 6.0 * (+new Date() - seed) / 5000);
			r = t * 200 + y;
			g = t * 200 - y;
			b = t * 255 - x / height;

			imageData.data[pos++] = Math.max(0, Math.min(255, r));
			imageData.data[pos++] = Math.max(0, Math.min(255, g));
			imageData.data[pos++] = Math.max(0, Math.min(255, b));
			imageData.data[pos++] = 255;

			x++;
		}
		
		y++;
	}
	
	postMessage({
		pixels: imageData,
		seed: seed
	});
};
