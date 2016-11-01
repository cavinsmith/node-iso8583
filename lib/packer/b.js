exports.unpack = function(msg, packager) {

	var chunk = msg;
	var chunkBin, data = '', bitmap = '';

	do {
		chunk = msg.substring(0, packager.length);
		chunkBitmap = chunk.match(/.{2}/g) // split by 8 symbols
					.map( function (byte) { return ('0000000' + parseInt(byte,16).toString(2)).slice(-8) })
					.join('')
		data += chunk;
		bitmap += chunkBitmap;
		msg = msg.substr(packager.length);
	} while(chunkBitmap[0] !== '0');

	var fieldIds = [];
	bitmap.split('').map( function (v, i) { if (v === '1') {fieldIds.push(i+1)}});

	console.log(fieldIds);

	return {
		data: data,
		bitmap: bitmap,
		fieldIds: fieldIds,
		restData: msg
	};
};

exports.pack = function(data, packager) {
	var bitmap = '';

	var lastIndex = 0;
	for (var i in data) {
		if (i > 1) {
			var offset = i - lastIndex - 1;
			for(var j = 0; j < offset; j++) {
				bitmap += '0';
			}
			bitmap += '1';
			lastIndex = i;
		}
	}

	var blength = bitmap.length;
	var length = Math.ceil(blength / (packager.length * 4)) * (packager.length * 4);

	for(var i = 0; i < length - blength; i++) {
		bitmap += '0';
	}

	// Convert from bits to hex symbols: split by 8 symbols,
	var msg = bitmap
							.match(/.{8}/g) // split by 8 symbols
							.map( function (byte) { return ('0' + parseInt(byte,2).toString(16)).slice(-2) }) // convert from binary text to hex, fix length,
							.join('')
							.toUpperCase();

	return {
		msg: msg,
		bitmap: bitmap
	};
};
