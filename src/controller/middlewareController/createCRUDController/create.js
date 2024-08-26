const create = async (Model, req, res) => {
	req.body.removed = false;

	const result = await Model.create({
		...req.body,
	});

	return res.status(200).json({
		success: true,
		result,
		message: 'Successfully Create the document in Model',
	});
};

export default create;
