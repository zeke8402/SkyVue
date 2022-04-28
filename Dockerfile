FROM amazonlinux
WORKDIR /root/sky
COPY . ./
RUN yum update -y &&\
    yum install -y tar zip gzip gcc-c++ make &&\
    curl -sL https://rpm.nodesource.com/setup_16.x | bash - &&\
    yum install -y nodejs &&\
    curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo &&\
    yum install -y yarn &&\
    yarn
RUN npm run build
CMD [ "npm", "run", "serve" ]
