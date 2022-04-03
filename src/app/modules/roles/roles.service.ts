import { Injectable } from '@nestjs/common';
import { RolesRepository } from '../../repositories/roles.repository';
import { BadRequestException } from '@nestjs/common';
import { ErrorMessage } from '../../../common/messages';
import { Roles } from '../../../app/entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}
  /**
   *
   * @param roleName
   * @returns
   */
  async getRoleByName(roleName: string): Promise<Roles> {
    const roles = await this.rolesRepository.getRoleByName(roleName);
    if (!roles) {
      throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
    }
    return roles[0];
  }
}
