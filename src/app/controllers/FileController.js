import File from '../models/File';

class FileController {
  async store(req, res) {
	  
	if (!req.file){
		return res.status(402).json({
			error: "A imagem não foi enviada",
		});
	}
    
	const { originalname: name, filename: path } = req.file;
	const file = await File.create({
      name,
      path,
    });
    return res.status(200).json(file);
  }
  
  async index(req, res) {
	const file = await File.findByPk(req.params.id);
	if (!currentFile){
		return res.status(401).json({
			error: "A imagem solicitada não foi localizada",
		});
	}
	return res.status(402).sendFile(file.path);
	  
  }
  
  async update(req, res) {
	const currentFile = await File.findByPk(req.params.id);
	if (!currentFile){
		return res.status(401).json({
			error: "A imagem solicitada não foi localizada",
		});
	}
	if (!req.file){
		return res.status(402).json({
			error: "A nova imagem não foi enviada",
		});
	}
	
    const { originalname: name, filename: path } = req.file;
    const file = await currentFile.update({
      name,
      path,
    });
    return res.status(200).json(file);
  }
  
  async delete(req, res) {
	  const file = await File.findByPk(req.params.id);
	  if (!file){
		return res.status(401).json({
			error: "A imagem solicitada não foi localizada",
		});
	  }
	  await File.destroy({
            where: {
                id: req.params.id
            }
      });
	  return res.status(200).json({
			message: "Imagem excluída com sucesso",
		});
	  
  }
}

export default new FileController();