# Jenkins JNLP Runner

## How to install

### Jenkins server

Firstly, you should make sure Jenkins are had opened 50000 port for performing JNLP commands.
For this, go to Manage Jenkins -> Configure global security -> Agents and set "TCP port for inbound agents" as static 50000 port and press "Apply".

Actions for creation of the runner node:
Go to Manage Jenkins -> Manage nodes -> New node and set these values:
* Name: whatever you like
* Remote root directory: `/home/jenkins`
* Labels: 'x11'
* Usage: "Only build jobs with label expressions matching this node"
* Launch method: "Launch agent by connecting it to the master"

After this, you should select created runner and save the proposed command that contains token and name.

### This runner

Fill the secret by appropriate values that got from previous step.
Deploy all *.yaml files to Kubernetes.