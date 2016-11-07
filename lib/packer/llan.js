exports.unpack = function(msg, packager) {
	var length = parseInt(msg.substring(0, 2), 10) * 2;

	if(length > packager.length * 2) {
		length = packager.length * 2;
	}

	var result = {
		data: msg.substring(2, length + 2),
		chunk: msg.substring(0, length + 2),
		restData: msg.substring(length + 2)
	};

	return result;
};

exports.pack = function(row, packager) {
	var length = row.length / 2;
	if (length > packager.length) {
		length = packager.length;
	}

	var msg = ('00000' + length).slice(-2);

	return {
		msg: msg + row.substr(0, length * 2)
	}
};
