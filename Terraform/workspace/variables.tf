variable "vpc_id" {
  description = "The VPC ID where the security group will be created"
  type        = string
  default     = "vpc-12345678"  
}

variable "subnet_id" {
  description = "The subnet ID where the EC2 instance will be launched"
  type        = string
  default     = "subnet-12345678"  
}

variable "key_pair" {
  description = "The name of the key pair to use for the EC2 instance"
  type        = string
  default     = "your-key-pair"  
}
