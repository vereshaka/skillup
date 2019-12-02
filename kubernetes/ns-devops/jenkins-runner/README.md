# Jenkins JNLP Runner

## How to install

### Jenkins server

Go to Manage Jenkins -> Manage nodes -> New node and set these values:
* Name: whatever you like
* Remote root directory: `/home/jenkins`
* Labels: whatever you like
* Usage: "Only build jobs with label expressions matching this node"
* Launch method: "Launch agent by connecting it to the master"

After this, you should select created runner and save the proposed command that contains token and name.

### This runner

Fill the secret by appropriate values that got from previous step.
Deploy all *.yaml files to Kubernetes.