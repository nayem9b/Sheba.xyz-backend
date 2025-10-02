provider "aws" {
  region ="us-east-1"
}


module "sg" {
  source = "terraform-aws-modules/security-group/aws"
  name        = "sheba-backend-sg"
  description = "Security group for netflix clone server"
  vpc_id      = var.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 3333
      to_port     = 3333
      protocol    = "tcp"
      description = "Sheba port"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      description = "HTTPS"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      description = "HTTP"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      description = "SSH"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 9000
      to_port     = 9000
      protocol    = "tcp"
      description = "SonarQube port"
      cidr_blocks = "0.0.0.0/0"
    }
  ]
    egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      description = "All traffic"
      cidr_blocks = "0.0.0.0/0"
    }
  ]
    tags = {
        Terraform   = "true"
        Environment = "dev"
    }
}


module "ec2_instance" {
  source = "terraform-aws-modules/ec2-instance/aws"

  name = "sheba-server"

  instance_type          = var.instance_type
  ami                    = var.ami
  key_name               = var.key_pair
  monitoring             = true
  vpc_security_group_ids = [module.sg.vpc_security_group_ids]
  subnet_id              = var.subnet_id
  user_data              = file("userdata.sh")
  root_block_device = [
    { volume_size = 25
      volume_type = "gp3"
    }
  ]

  tags = {
    Terraform   = "true"
    Environment = "dev"
    Name        = "sheba-server"
  }
}

resource "aws_eip" "eip" {
  instance = module.ec2_instance.id[0]
  domain   = "vpc"
}