const port = 2110;

const search_directory = "/home/nq/Downloads";
const blacklisted_stems = ["git", "licenta", "Desktop", ".android", ".cache", ".cargo", ".ccache", ".conan", ".config", ".cpan", ".docker", ".ghc", ".ghcup", ".gnupg", ".gphoto", ".java", ".kchmviewer", ".local", ".m2", ".mongodb", ".mozilla", ".netbeans", ".npm", ".nvm", ".openjfx", ".pki", ".purple", ".scenebuilder", ".skylobby", ".spring", ".springlobby", ".swt", ".thunderbird", ".vscode", ".wine", ".x-formation", ".YAKINDU", ".zoom"];
const URI_FileDirectory = "/media/nq/Second/FileDatabase";

const ACCEPTED_FORMATS_LibreOffice = [];
const ACCEPTED_FORMATS_ddjvu = ["djvu"];

module.exports = {port, search_directory, blacklisted_stems, URI_FileDirectory, ACCEPTED_FORMATS_LibreOffice, ACCEPTED_FORMATS_ddjvu};
