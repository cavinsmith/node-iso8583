exports.unpack = function(msg, packager) {
	var length = parseInt(msg.substring(0, 4), 10) * 2;

	if(length > packager.length) {
		length = packager.length;
	}

	var result = {
		data: msg.substring(4, length + 4),
		chunk: msg.substring(0, length + 4),
		restData: msg.substring(length + 4)
	};
	return result;
};

exports.pack = function(row, packager) {
	var length = row.length / 2;
	if (length > packager.length) {
		length = packager.length;
	}

	var msg = ('00000' + length).slice(-4);

	return {
		msg: msg + row.substr(0, length * 2)
	}
};
