export function catchErrors(fn) {
	return function (req, res, next) {
		if (typeof fn !== 'function') {
			return res.status(500).json({
				success: false,
				result: null,
				message: 'Internal server error: Invalid function',
				controller: 'catchErrors',
				error: new Error('Invalid function passed to catchErrors'),
			});
		}
		return Promise.resolve(fn(req, res, next)).catch((error) => {
			if (error.name === 'ValidationError') {
				return res.status(400).json({
					success: false,
					result: null,
					message: 'Required fields are not supplied',
					controller: fn.name,
					error,
				});
			} else {
				return res.status(500).json({
					success: false,
					result: null,
					message: error.message,
					controller: fn.name,
					error,
				});
			}
		});
	};
}
