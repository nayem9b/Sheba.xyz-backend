#!/bin/bash

# install git
sudo yum update -y
sudo yum install git -y

# install jenkins
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo yum upgrade -y
sudo dnf install java-17-amazon-corretto -y
sudo yum install jenkins -y
sudo systemctl enable jenkins
sudo systemctl start jenkins

# install docker
sudo yum install docker -y
sudo usermod -a -G docker ec2-user
sudo usermod -a -G docker jenkins
sudo chmod 777 /var/run/docker.sock
sudo systemctl enable docker
sudo systemctl start docker