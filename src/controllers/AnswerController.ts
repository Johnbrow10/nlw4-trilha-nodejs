import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppErrors } from '../errors/AppErrors';
import { SurveysUserRepository } from '../repositories/SurveysUserRepository';


class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        //  Ta listando os dados
        const surveysUsersRepository = getCustomRepository(SurveysUserRepository);

        // faz um where no id do servey user da requisição
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        // se nao existir retorna o erro
        if (!surveyUser) {
            throw new AppErrors("Survey User does not exist");

        }
        // se existir sobrescreve valor do parametro, trazendo o valor da resposta do cliente
        surveyUser.value = Number(value);

        // entao salva a resposta do cliente
        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);

    }
}

export { AnswerController };
