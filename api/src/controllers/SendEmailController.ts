import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUserRepositoty } from "../repositories/SurveysUserRepository";
import { UsersRepository } from "../repositories/UsersRepository";



class SendEmailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUserRepository = getCustomRepository(SurveysUserRepositoty);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists",
            })
        }

        const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id })

        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists!"
            })
        }

        //Salvar Informações no banco
        const surveyUser = surveysUserRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });

        await surveysUserRepository.save(surveyUser);
        //Enviar e-mail para usuário

        return response.json(surveyUser);

    }
}

export { SendEmailController }