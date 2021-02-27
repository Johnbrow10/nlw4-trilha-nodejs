import { EntityRepository, Repository } from "typeorm";
import { SurveysUsers } from "../models/SurveysUsers";


@EntityRepository(SurveysUsers)
class SurveysUserRepositoty extends Repository<SurveysUsers> {

}

export{ SurveysUserRepositoty };