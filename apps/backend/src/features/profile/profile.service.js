export class ProfileService {
  constructor(Profile) {
    this.Profile = Profile;
  }

  static get deps() {
    return ["Profile"];
  }

  async getProfile(id) {
    const profile = await this.Profile.findById(id);
    return profile.toObject();
  }
}
