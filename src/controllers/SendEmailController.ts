import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUserRepositoty } from "../repositories/SurveysUserRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";



class SendEmailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUserRepository = getCustomRepository(SurveysUserRepositoty);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            return response.status(400).json({
                error: "User does not exists",
            })
        }

        const survey = await surveysRepository.findOne({ id: survey_id })

        if (!survey) {
            return response.status(400).json({
                error: "Survey does not exists!"
            })
        }

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsEmail.hbs");

        const surveyUserAlredyExists = await surveysUserRepository.findOne({
            where: [{ user_id: user.id }, { value: null }],
            relations: ["user", "survey"]
        });

        if (surveyUserAlredyExists) {
            await SendMailService.execute(email, survey.title, variables, npsPath)
            return response.json(surveyUserAlredyExists)
        }

        //Salvar Informações no banco
        const surveyUser = surveysUserRepository.create({
            user_id: user.id,
            survey_id
        });

        await surveysUserRepository.save(surveyUser);
        //Enviar e-mail para usuário



        await SendMailService.execute(email, survey.title, variables, npsPath)

        return response.json(surveyUser);

    }
}

export { SendEmailController };
