import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommunityService } from './community.service';
import { AuthGuard } from 'src/guard/authentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { dS, fileValidation, fileValidationTypes } from 'src/common';
import { CreateCommunityDto } from './dto/createCommunty.dto';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { UserRole } from 'src/utils/enums/user.enums';

@Controller('community')
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class CommunityController {

    constructor(private communityService: CommunityService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: dS('uploads/community'),
        fileFilter: fileValidation(fileValidationTypes.image)
    }))
    @Roles(UserRole.VULONTEER,UserRole.ADMIN) // Restrict to volunteers and admins
    createCommunity(@Body() body: any, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        
        return this.communityService.createCommunity(body, req, file)
    }

    //get all community of specific subcategory
    @Get(':subcategoryId')
    getAllCommunities(@Param() param: any) {
        return this.communityService.getAllCommunities(param)
    }

    //get specific community
    @Get('specific/:communityId')
    getSpecificCommunity(@Param() param:any, @Req() req: any) {
        return this.communityService.getSpecificCommunity(param, req)
    }   

    //delete community
    @Delete(':communityId')
    deleteCommunity(@Param() param:any, @Req() req: any) {
        return this.communityService.deleteCommunity(param, req)
    }   

    //update community 
    @Put(':communityId')
    @UseInterceptors(FileInterceptor('image', {
        storage: dS('uploads/community'),
        fileFilter: fileValidation(fileValidationTypes.image)
    }))
    updateCommunity(
        @Param() param: any, @Req() req: any,
        @Body() body: any, @UploadedFile() file: Express.Multer.File
    ) {
        return this.communityService.updateCommuniuty(param, req, body, file)
    }
}
