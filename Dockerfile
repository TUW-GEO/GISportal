#
#  This Dockerfile creates an image based on the contents of the current
#  folder; therefore the submodules have to be initalised and updated before 
#  the image is build. See docker-readme.md for full details
#
#  To obtain the latest image direct from the Docker Hub you can 
#  run `docker pull pmlrsg/gisportal` on the command line
#

FROM centos:8

MAINTAINER "Ben Calton" <bac@pml.ac.uk>

ADD pip3-requirenments.txt  /app/pip-requirenments.txt

RUN yum -y update && \
    yum clean all && \
    yum install -y epel-release gcc && \
    dnf group install "Development Tools" -y && \
    dnf install -y nodejs \
        npm \
        git \
        wget \
        hdf5 \
        --enablerepo=PowerTools libdap \
        libaec \
        redis \
        ruby \
        ruby-devel \
        libffi-devel \
        gdal \
        libjpeg-turbo \
        freetype-devel \
        libpng-devel \
        hdf5-devel \
        netcdf-devel \
        python2 \
        python2-devel \
        python2-pip \
        python3 \
        python3-devel \
        python3-pip  && \
    pip3 install virtualenv && \
    python3 -m virtualenv --python=/usr/bin/python3 /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
    # TODO: add h5py, netCDF to pip-requirenments
RUN pip2 install -r /app/pip-requirenments.txt --no-cache-dir && \
    npm install -g grunt-cli && \
    gem install sass && \
    mkdir -p /app/GISportal/config

ADD ./package.json /app/GISportal/package.json

RUN cd /app/GISportal && \
    npm install

ADD . /app/GISportal/

VOLUME /app/GISportal/config

EXPOSE 6789
WORKDIR /app/GISportal
RUN chmod +x /app/GISportal/docker-run.sh
CMD ["/app/GISportal/docker-run.sh"]

