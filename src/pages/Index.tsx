
import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <MainLayout pageTitle="Process Modeling Suite" className="bg-muted/30">
      <div className="flex flex-col gap-8 max-w-6xl mx-auto py-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to the Process Modeling Suite</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive platform for business process management, modeling, and analysis
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Process Manager</CardTitle>
              <CardDescription>Model, design and manage business processes</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Create and edit BPMN diagrams</p>
              <Button asChild>
                <Link to="/process-manager">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repository</CardTitle>
              <CardDescription>Store and organize all your process assets</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Browse your process repository</p>
              <Button asChild>
                <Link to="/repository">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Process Intelligence</CardTitle>
              <CardDescription>Analyze and optimize your processes</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Gain insights from process data</p>
              <Button asChild>
                <Link to="/process-intelligence">
                  Analyze <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Journey Modeler</CardTitle>
              <CardDescription>Map customer and user journeys</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Design customer experience flows</p>
              <Button asChild>
                <Link to="/journey-modeler">
                  Design <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collaboration Hub</CardTitle>
              <CardDescription>Work together on process projects</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Share and collaborate</p>
              <Button asChild>
                <Link to="/collaboration-hub">
                  Collaborate <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Get an overview of process activities</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">View your process metrics</p>
              <Button asChild>
                <Link to="/dashboard">
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
