{ pkgs }: 
{
  deps = [
    pkgs.nodejs-14_x
    pkgs.nodePackages.npm
  ];

  nixpkgs.config = {
    permittedInsecurePackages = [
      "nodejs-14.21.3"
    ];
  };
}
