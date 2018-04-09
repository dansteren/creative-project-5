# creative-project-5-server

## Getting Started

There are a few things that will make thing project easier. We will be loading in passwords using environment variables so that the passwords aren't stored in git. That means you will either need to pass the password when you issue the command or you will need to install direnv.

### Installing Direnv

Direnv requires that you have make and golang.

Install make:

```shell
sudo apt install build-essential
```

Install golang:

```shell
curl https://dl.google.com/go/go1.10.1.linux-amd64.tar.gz
tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
```

Add go to the path. And while we're at it add the folder where packages are installed as well. Edit .bashrc and add:

```shell
# Go lang
export GO_HOME=/usr/local/go
export GOPATH=$HOME/go

# PATH
export PATH=$PATH:$GO_HOME/bin:$GOPATH/bin
```

Make your go workspace:

```shell
mkdir ~/go
```

Now that you have go and make installed you can install direnv through go:

```shell
go get github.com/direnv/direnv
```

Last step: Have direnv run everytime you change directories. Add this to then end of your .bashrc:

```shell
eval "$(direnv hook bash)"
```

At this point direnv should be all set up. You can test it by making a folder with a .envrc file in it and then cding into that folder.
