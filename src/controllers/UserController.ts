import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppErrors } from '../errors/AppErrors';

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Campo Nome é obrigatorio"),
            email: yup.string().email().required("Campo email está vazio, ou incorreto"),
        })



        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            throw new AppErrors(err)
        }

        const usersRepository = getCustomRepository(UsersRepository);

        // SELECT * FROM USERS WHERE EMAIL = EMAIL
        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if (userAlreadyExists) {
            throw new AppErrors("Users alredy exists!")
        }

        const user = usersRepository.create(
            {
                name, email
            }
        )

        await usersRepository.save(user);

        return response.status(201).json(user);
    }

}

export { UserController };
