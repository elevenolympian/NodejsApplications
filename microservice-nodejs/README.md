#### Additional Information for NPM Package Manager

Update the npm package manager to the last version

```bash
npm install -g npm@latest
```

To delete npm package manager completely, do as below:

```bash
sudo rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/{npm*,node*,man1/node*}
```

```bash
sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node* /usr/local/lib/dtrace/node.d ~/.npm ~/.node-gyp
```

```bash
sudo rm -rf /opt/local/bin/node /opt/local/include/node /opt/local/lib/node_modules
```

```bash
sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node.1 /usr/local/lib/dtrace/node.d
```

```bash
brew uninstall npm
```

```bash
brew cleanup
```
