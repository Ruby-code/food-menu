import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/Services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService){
    super({
        usernameField: "email",
    });
}

async validate (email:string, password:string){
    console.log('Inside local strategy');
    console.log(email);
    console.log(password);
    const user = this.authService.validateUser(email, password);
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
}
}