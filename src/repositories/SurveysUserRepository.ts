import { EntityRepository, Repository } from "typeorm";
import { SurveysUsers } from "../models/SurveysUsers";


@EntityRepository(SurveysUsers)
class SurveysUserRepository extends Repository<SurveysUsers> {

}

export{ SurveysUserRepository };