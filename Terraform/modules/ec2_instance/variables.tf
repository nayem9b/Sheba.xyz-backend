variable "vpc_id" {
  description = "The ID of the VPC where resources will be created"
  type        = string
}

variable "instance_type" {
  description = "The EC2 instance type (e.g., t2.micro)"
  type        = string
}

variable "ami" {
  description = "The Amazon Machine Image (AMI) ID to use for the instance"
  type        = string
}

variable "key_pair" {
  description = "The name of the key pair to use for SSH access"
  type        = string
}

variable "subnet_id" {
  description = "The ID of the subnet where the instance will be launched"
  type        = string
}
