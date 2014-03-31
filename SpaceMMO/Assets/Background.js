#pragma strict

function Start ()
{
	
}

function Update ()
{
	transform.position = GameObject.Find("Player").transform.position;
}